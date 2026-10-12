const fmtMonth = new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const fmtYear = new Intl.DateTimeFormat('es-ES', { year: 'numeric', timeZone: 'UTC' });

export function formatDate(d: Date, precision: 'year' | 'month' = 'month') {
  return (precision === 'year' ? fmtYear : fmtMonth).format(d).replace('.', '');
}

export function formatRange(start: Date, end: Date | undefined, precision: 'year' | 'month' = 'month') {
  return `${formatDate(start, precision)} – ${end ? formatDate(end, precision) : 'Actualidad'}`;
}

export const categoryLabels: Record<string, string> = {
  fabric: 'Microsoft Fabric',
  'power-bi': 'Power BI',
  'machine-learning': 'Machine Learning',
  mlops: 'MLOps',
  automation: 'Automatización',
  app: 'Aplicaciones',
};
