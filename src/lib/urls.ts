/** Path inside this site, independent of its deployment subdirectory. */
export function routePath(path: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  const pathname = path.split(/[?#]/, 1)[0];
  const prefix = base.replace(/\/$/, '');
  const local = prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))
    ? pathname.slice(prefix.length) : pathname;
  return local.replace(/\/+$/, '') || '/';
}

/** Match the directory URLs produced by the static build; preserve query/hash. */
export function withBase(path: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const suffixStart = path.search(/[?#]/);
  const pathname = suffixStart < 0 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart < 0 ? '' : path.slice(suffixStart);
  const prefix = base.replace(/\/$/, '');
  const local = routePath(pathname, base);
  const isFile = /\.[^/]+$/.test(local);
  const normalized = local === '/' ? '/' : `${local}${isFile ? '' : '/'}`;
  return `${prefix}${normalized}${suffix}`;
}

export function canonicalUrl(path: string, site: URL | string, base = import.meta.env?.BASE_URL ?? '/'): string {
  const url = new URL(withBase(path, base), site);
  url.search = '';
  url.hash = '';
  return url.href;
}
