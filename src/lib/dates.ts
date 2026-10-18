const timeZone = 'Europe/Berlin';
const dayFormatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone });

export function formatEventDate(startValue: string, endValue?: string, language: 'de' | 'en' = 'de'): string {
  const locale = language === 'en' ? 'en-GB' : 'de-DE';
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone });
  const timeFormatter = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', timeZone });
  const dateTimeFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short', timeZone });
  const timeSuffix = language === 'en' ? '' : ' Uhr';
  const start = new Date(startValue);
  if (!endValue) return `${dateFormatter.format(start)} · ${timeFormatter.format(start)}${timeSuffix}`;
  const end = new Date(endValue);
  if (dayFormatter.format(start) === dayFormatter.format(end)) {
    return `${dateFormatter.format(start)} · ${timeFormatter.format(start)}–${timeFormatter.format(end)}${timeSuffix}`;
  }
  return `${dateTimeFormatter.format(start)} – ${dateTimeFormatter.format(end)}`;
}
