// src/utils/translations.ts
// Re-export from canonical src/i18n/ui.ts and src/i18n/utils.ts
export { LANGUAGES, ui as TRANSLATIONS, defaultLang, languages } from '../i18n/ui';
export type { LanguageInfo as LanguageOption, SupportedLocale, UIKey } from '../i18n/ui';
export { getLangFromUrl, useTranslations, getRouteFromUrl, getLocalizedUrl } from '../i18n/utils';
