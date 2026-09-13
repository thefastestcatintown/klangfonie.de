const timeZone = 'Europe/Berlin';
const dateFormatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeZone });
const timeFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', timeZone });
const dateTimeFormatter = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long', timeStyle: 'short', timeZone });
const dayFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone });

export function formatEventDate(startValue: string, endValue?: string): string {
  const start = new Date(startValue);
  if (!endValue) return `${dateFormatter.format(start)} · ${timeFormatter.format(start)} Uhr`;
  const end = new Date(endValue);
  if (dayFormatter.format(start) === dayFormatter.format(end)) {
    return `${dateFormatter.format(start)} · ${timeFormatter.format(start)}–${timeFormatter.format(end)} Uhr`;
  }
  return `${dateTimeFormatter.format(start)} – ${dateTimeFormatter.format(end)}`;
}
