import type { Event } from './types';

const timeZone = 'Europe/Berlin';
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

type DateParts = { year: number; month: number; day: number; hour: number; minute: number; second: number };

function zonedParts(value: Date): DateParts {
  const parts = Object.fromEntries(formatter.formatToParts(value).filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]));
  return { year: parts.year, month: parts.month, day: parts.day, hour: parts.hour, minute: parts.minute, second: parts.second };
}

function fromBerlinTime(parts: DateParts): Date {
  const desired = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  let timestamp = desired;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const actual = zonedParts(new Date(timestamp));
    const actualAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute, actual.second);
    timestamp += desired - actualAsUtc;
  }
  return new Date(timestamp);
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function occurrenceAt(start: Date, recurrence: Exclude<Event['recurrence'], 'none' | undefined>, index: number): Date {
  const original = zonedParts(start);
  if (recurrence === 'weekly') {
    const calendarDate = new Date(Date.UTC(original.year, original.month - 1, original.day + index * 7));
    return fromBerlinTime({ ...original, year: calendarDate.getUTCFullYear(), month: calendarDate.getUTCMonth() + 1, day: calendarDate.getUTCDate() });
  }

  const monthOffset = recurrence === 'monthly' ? index : index * 12;
  const monthDate = new Date(Date.UTC(original.year, original.month - 1 + monthOffset, 1));
  const year = monthDate.getUTCFullYear();
  const month = monthDate.getUTCMonth() + 1;
  return fromBerlinTime({ ...original, year, month, day: Math.min(original.day, daysInMonth(year, month)) });
}

function berlinDate(value: Date): string {
  const parts = zonedParts(value);
  return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
}

export function expandRecurringEvents<T extends Event>(events: T[], now = new Date(), limitPerSeries = 12): T[] {
  const expanded = events.flatMap((event) => {
    if (!event.date || !event.recurrence || event.recurrence === 'none') {
      return !event.date || new Date(event.date) >= now ? [event] : [];
    }

    const start = new Date(event.date);
    if (Number.isNaN(start.getTime())) return [];
    const duration = event.endDate ? Math.max(0, new Date(event.endDate).getTime() - start.getTime()) : undefined;
    const occurrences: T[] = [];

    for (let index = 0; index < 2400 && occurrences.length < limitPerSeries; index += 1) {
      const occurrenceStart = occurrenceAt(start, event.recurrence, index);
      if (event.repeatUntil && berlinDate(occurrenceStart) > event.repeatUntil) break;
      if (occurrenceStart < now) continue;
      occurrences.push({
        ...event,
        date: occurrenceStart.toISOString(),
        endDate: duration === undefined ? undefined : new Date(occurrenceStart.getTime() + duration).toISOString(),
      });
    }
    return occurrences;
  });

  return expanded.sort((left, right) => {
    if (!left.date) return right.date ? 1 : 0;
    if (!right.date) return -1;
    return new Date(left.date).getTime() - new Date(right.date).getTime();
  });
}
