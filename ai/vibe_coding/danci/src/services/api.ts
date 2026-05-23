import type { LangCode } from '../constants/languages';
import type { ChatMessage, LookupResult, StoryResult } from '../types';

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data as T;
}

export function checkHealth(): Promise<{ ok: boolean; hasKey: boolean }> {
  return fetch('/api/health').then((r) => r.json());
}

export function lookup(
  query: string,
  nativeLang: LangCode,
  targetLang: LangCode
): Promise<LookupResult> {
  return post('/api/lookup', { query, nativeLang, targetLang });
}

export function chat(
  messages: ChatMessage[],
  context: {
    query: string;
    targetText: string;
    nativeLang: LangCode;
    targetLang: LangCode;
  }
): Promise<{ reply: string }> {
  return post('/api/chat', { messages, context });
}

export function generateStory(
  items: { query: string; targetText: string }[],
  nativeLang: LangCode,
  targetLang: LangCode
): Promise<StoryResult> {
  return post('/api/story', { items, nativeLang, targetLang });
}
