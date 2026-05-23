import { useCallback, useRef } from 'react';
import { getLanguage, type LangCode } from '../constants/languages';

export function useSpeech() {
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, lang: LangCode) => {
    if (!text.trim() || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = getLanguage(lang).speechCode;
    utter.rate = 0.95;
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
  }, []);

  return { speak, stop };
}
