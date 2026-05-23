import { useState } from 'react';
import { LANG_NAMES } from '../constants/languages';
import type { LookupResult } from '../types';
import { ChatPanel } from './ChatPanel';
import { SpeechButton } from './SpeechButton';

interface Props {
  result: LookupResult;
  saved: boolean;
  onSave: () => void;
  onBack: () => void;
}

export function ResultPage({ result, saved, onSave, onBack }: Props) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="result">
      <header className="result-top">
        <button type="button" className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <button
          type="button"
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={onSave}
          disabled={saved}
        >
          {saved ? '已加入笔记本' : '保存到笔记本'}
        </button>
      </header>

      <section className="result-head card">
        <p className="query-label">{result.query}</p>
        <div className="target-row">
          <h2>{result.targetText}</h2>
          <SpeechButton text={result.targetText} lang={result.targetLang} />
        </div>
        <span className="lang-badge">
          {LANG_NAMES[result.targetLang]}
        </span>
      </section>

      {result.imageUrl && (
        <figure className="concept-image card">
          <img src={result.imageUrl} alt={result.imagePrompt || result.query} />
        </figure>
      )}

      <section className="card">
        <h3>解释</h3>
        <p className="body-text">{result.explanation}</p>
      </section>

      <section className="card">
        <h3>例句</h3>
        <ul className="examples">
          {result.examples.map((ex, i) => (
            <li key={i}>
              <div className="ex-target">
                <p>{ex.sentence}</p>
                <SpeechButton text={ex.sentence} lang={result.targetLang} small />
              </div>
              <p className="ex-trans">{ex.translation}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="card tips-card">
        <h3>朋友式小贴士</h3>
        <p className="body-text tips">{result.usageTips}</p>
      </section>

      <button type="button" className="btn-chat" onClick={() => setChatOpen(true)}>
        💬 继续提问
      </button>

      {chatOpen && <ChatPanel result={result} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
