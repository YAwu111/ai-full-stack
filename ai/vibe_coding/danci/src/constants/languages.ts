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

export interface Language {
  code: LangCode;
  name: string;
  nativeName: string;
  speechCode: string;
}

export const LANGUAGES: Language[] = [
  { code: 'zh', name: 'Chinese', nativeName: '中文', speechCode: 'zh-CN' },
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', speechCode: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', speechCode: 'fr-FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', speechCode: 'de-DE' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', speechCode: 'ja-JP' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', speechCode: 'ko-KR' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', speechCode: 'pt-PT' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', speechCode: 'ru-RU' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', speechCode: 'ar-SA' },
];

export function getLanguage(code: LangCode): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export const LANG_NAMES: Record<LangCode, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l.nativeName])
) as Record<LangCode, string>;
