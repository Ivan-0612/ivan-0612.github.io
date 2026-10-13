import type { Lang } from './i18n';
import { ui } from './i18n';

const locale = (l: Lang) => (l === 'en' ? 'en-GB' : 'es-ES');
const fmt = (l: Lang, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale(l), { ...o, timeZone: 'UTC' });

export function formatDate(d: Date, precision: 'year' | 'month' = 'month', lang: Lang = 'es') {
  const f = precision === 'year' ? fmt(lang, { year: 'numeric' }) : fmt(lang, { month: 'short', year: 'numeric' });
  return f.format(d).replace('.', '');
}

export function formatRange(start: Date, end: Date | undefined, precision: 'year' | 'month' = 'month', lang: Lang = 'es') {
  return `${formatDate(start, precision, lang)} – ${end ? formatDate(end, precision, lang) : ui[lang].present}`;
}

/** Compatibilidad: etiquetas de categoría en español */
export const categoryLabels: Record<string, string> = ui.es.categories;
