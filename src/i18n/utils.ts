// src/i18n/utils.ts
import { ui, defaultLang, languages, type SupportedLocale, type UIKey, LANGUAGES } from './ui';

export { languages, defaultLang, ui, LANGUAGES, type SupportedLocale, type UIKey };

export function getLangFromUrl(url: URL): SupportedLocale {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as SupportedLocale;
  return defaultLang;
}

export function useTranslations(lang: SupportedLocale) {
  return function t(key: UIKey): string {
    const dict = ui[lang] as Record<string, string> | undefined;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    const defaultDict = ui[defaultLang] as Record<string, string>;
    return defaultDict[key] || (key as string);
  };
}

export function getRouteFromUrl(url: URL | string): string {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const parts = pathname.split('/');
  const maybeLang = parts[1];
  if (maybeLang && maybeLang in ui) {
    const remainder = '/' + parts.slice(2).join('/');
    return remainder === '//' ? '/' : (remainder || '/');
  }
  return pathname || '/';
}

export function getLocalizedUrl(route: string, targetLang: SupportedLocale): string {
  const cleanRoute = route.startsWith('/') ? route : '/' + route;
  const strippedRoute = getRouteFromUrl(cleanRoute);
  if (targetLang === defaultLang) {
    return strippedRoute;
  }
  if (strippedRoute === '/') {
    return `/${targetLang}/`;
  }
  return `/${targetLang}${strippedRoute.endsWith('/') ? strippedRoute : strippedRoute + '/'}`;
}
