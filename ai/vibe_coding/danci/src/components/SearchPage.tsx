import { useState } from 'react';
import { LANG_NAMES, type LangCode } from '../constants/languages';
import { lookup } from '../services/api';
import type { LookupResult } from '../types';

interface Props {
  nativeLang: LangCode;
  targetLang: LangCode;
  onResult: (r: LookupResult) => void;
  onOpenNotebook: () => void;
  onChangeLanguages: () => void;
}

export function SearchPage({
  nativeLang,
  targetLang,
  onResult,
  onOpenNotebook,
  onChangeLanguages,
}: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    const q = query.trim();
    if (!q || loading) return;
    setError('');
    setLoading(true);
    try {
      const result = await lookup(q, nativeLang, targetLang);
      onResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : '查询失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <header className="search-header">
        <div>
          <h1>Vibe 词典</h1>
          <button type="button" className="lang-link" onClick={onChangeLanguages}>
            {LANG_NAMES[nativeLang]} → {LANG_NAMES[targetLang]} · 更换
          </button>
        </div>
        <button type="button" className="notebook-link" onClick={onOpenNotebook}>
          笔记本
        </button>
      </header>

      <div className="search-box card">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入单词、短语或整句…"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              search();
            }
          }}
        />
        <button type="button" className="btn-primary" onClick={search} disabled={loading}>
          {loading ? '查询中…' : '查询'}
        </button>
      </div>

      {error && <p className="hint error">{error}</p>}

      <p className="search-tips">
        支持单词、短句、整句 · 例句可朗读 · 结果可保存复习
      </p>
    </div>
  );
}
