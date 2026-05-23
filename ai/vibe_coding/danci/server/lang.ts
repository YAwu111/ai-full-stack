export type LangCode =
  | 'zh'
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'ar';

export const LANG_NAMES: Record<LangCode, string> = {
  zh: '中文',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
  ar: 'العربية',
};
