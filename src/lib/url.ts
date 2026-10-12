/** Prefija rutas con la base del sitio (necesario si el repo no es usuario.github.io). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => base + (path.startsWith('/') ? path : '/' + path);
