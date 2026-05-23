import type { LangCode } from './constants/languages';

export interface ExampleSentence {
  sentence: string;
  translation: string;
}

export interface LookupResult {
  id: string;
  query: string;
  targetText: string;
  explanation: string;
  examples: ExampleSentence[];
  usageTips: string;
  imageUrl: string | null;
  imagePrompt: string;
  nativeLang: LangCode;
  targetLang: LangCode;
  savedAt?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface UserSettings {
  nativeLang: LangCode;
  targetLang: LangCode;
  setupComplete: boolean;
}

export interface StoryResult {
  title: string;
  story: string;
  vocabularyUsed: string[];
}
