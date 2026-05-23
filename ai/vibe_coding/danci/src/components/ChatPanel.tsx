import { useState } from 'react';
import { chat } from '../services/api';
import type { ChatMessage, LookupResult } from '../types';

interface Props {
  result: LookupResult;
  onClose: () => void;
}

export function ChatPanel({ result, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const { reply } = await chat(next, {
        query: result.query,
        targetText: result.targetText,
        nativeLang: result.nativeLang,
        targetLang: result.targetLang,
      });
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: e instanceof Error ? e.message : '出错了，请重试',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-overlay" role="dialog" aria-label="继续提问">
      <div className="chat-panel">
        <header className="chat-header">
          <h3>关于「{result.query}」</h3>
          <button type="button" className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="chat-messages">
          {messages.length === 0 && (
            <p className="chat-empty">随便问：语气？场合？和哪个词容易混？</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble chat-bubble--${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && <div className="chat-bubble chat-bubble--assistant typing">…</div>}
        </div>

        <footer className="chat-input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="输入你的问题…"
            disabled={loading}
          />
          <button type="button" className="btn-primary" onClick={send} disabled={loading}>
            发送
          </button>
        </footer>
      </div>
    </div>
  );
}
