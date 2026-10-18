import { routePath, withBase } from './urls.ts';

export type Language = 'de' | 'en';

export function languageFromPath(path: string, base = import.meta.env?.BASE_URL ?? '/'): Language {
  const route = routePath(path, base);
  return route === '/en' || route.startsWith('/en/') ? 'en' : 'de';
}

export function contentPath(path: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  const route = routePath(path, base);
  if (route === '/en') return '/';
  return route.startsWith('/en/') ? route.slice(3) || '/' : route;
}

export function languageRoute(path: string, language: Language): string {
  const suffixStart = path.search(/[?#]/);
  const pathname = suffixStart < 0 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart < 0 ? '' : path.slice(suffixStart);
  const content = contentPath(pathname, '/');
  const localized = language === 'en' ? `/en${content === '/' ? '' : content}` : content;
  return `${localized || '/'}${suffix}`;
}

export function localizePath(path: string, language: Language): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return withBase(languageRoute(path, language));
}
