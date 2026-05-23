import { useCallback, useEffect, useState } from 'react';
import type { LangCode } from '../constants/languages';
import type { UserSettings } from '../types';

const KEY = 'danci-settings';

const defaultSettings: UserSettings = {
  nativeLang: 'zh',
  targetLang: 'en',
  setupComplete: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings));
  }, [settings]);

  const saveLanguages = useCallback((nativeLang: LangCode, targetLang: LangCode) => {
    setSettings({ nativeLang, targetLang, setupComplete: true });
  }, []);

  const resetSetup = useCallback(() => {
    setSettings((s) => ({ ...s, setupComplete: false }));
  }, []);

  return { settings, saveLanguages, resetSetup };
}
