import { useCallback, useEffect, useState } from 'react';
import type { LookupResult } from '../types';

const KEY = 'danci-notebook';

export function useNotebook() {
  const [items, setItems] = useState<LookupResult[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const isSaved = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const save = useCallback((entry: LookupResult) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === entry.id)) return prev;
      return [{ ...entry, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return { items, isSaved, save, remove };
}
