import { useState } from 'react';
import { LANGUAGES, type LangCode } from '../constants/languages';

interface Props {
  nativeLang: LangCode;
  targetLang: LangCode;
  onConfirm: (native: LangCode, target: LangCode) => void;
}

export function LanguageSetup({ nativeLang, targetLang, onConfirm }: Props) {
  const [native, setNative] = useState<LangCode>(nativeLang);
  const [target, setTarget] = useState<LangCode>(targetLang);

  const swap = () => {
    setNative(target);
    setTarget(native);
  };

  return (
    <div className="setup">
      <div className="setup-hero">
        <h1>Vibe 词典</h1>
        <p>选母语和学习语言，随时查词、听发音、记笔记本</p>
      </div>

      <div className="lang-pickers">
        <div className="lang-block">
          <label>我的母语</label>
          <div className="lang-grid">
            {LANGUAGES.map((l) => (
              <button
                key={`n-${l.code}`}
                type="button"
                className={`lang-chip ${native === l.code ? 'active' : ''}`}
                onClick={() => setNative(l.code)}
              >
                {l.nativeName}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="swap-btn" onClick={swap} aria-label="交换语言">
          ⇄
        </button>

        <div className="lang-block">
          <label>我要学</label>
          <div className="lang-grid">
            {LANGUAGES.map((l) => (
              <button
                key={`t-${l.code}`}
                type="button"
                className={`lang-chip ${target === l.code ? 'active' : ''}`}
                onClick={() => setTarget(l.code)}
              >
                {l.nativeName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary"
        disabled={native === target}
        onClick={() => onConfirm(native, target)}
      >
        开始学习
      </button>
      {native === target && (
        <p className="hint error">母语和目标语言不能相同</p>
      )}
    </div>
  );
}
