import { useState } from 'react';
import { LANG_NAMES } from '../constants/languages';
import { generateStory } from '../services/api';
import type { LangCode } from '../constants/languages';
import type { LookupResult, StoryResult } from '../types';
import { SpeechButton } from './SpeechButton';

interface Props {
  items: LookupResult[];
  nativeLang: LangCode;
  targetLang: LangCode;
  onBack: () => void;
  onOpenEntry: (entry: LookupResult) => void;
  onRemove: (id: string) => void;
}

export function NotebookPage({
  items,
  nativeLang,
  targetLang,
  onBack,
  onOpenEntry,
  onRemove,
}: Props) {
  const [story, setStory] = useState<StoryResult | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyError, setStoryError] = useState('');

  const makeStory = async () => {
    setStoryError('');
    setStoryLoading(true);
    try {
      const data = await generateStory(
        items.map((i) => ({ query: i.query, targetText: i.targetText })),
        nativeLang,
        targetLang
      );
      setStory(data);
    } catch (e) {
      setStoryError(e instanceof Error ? e.message : '生成失败');
    } finally {
      setStoryLoading(false);
    }
  };

  return (
    <div className="notebook">
      <header className="notebook-header">
        <button type="button" className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <h2>笔记本</h2>
        <span className="count">{items.length} 条</span>
      </header>

      {items.length > 0 && (
        <button
          type="button"
          className="btn-story"
          onClick={makeStory}
          disabled={storyLoading}
        >
          {storyLoading ? '编故事中…' : '✨ 编故事记忆'}
        </button>
      )}

      {storyError && <p className="hint error">{storyError}</p>}

      {story && (
        <article className="card story-card">
          <h3>{story.title}</h3>
          <p className="body-text story-body">{story.story}</p>
          {story.vocabularyUsed?.length > 0 && (
            <p className="story-words">用到：{story.vocabularyUsed.join(' · ')}</p>
          )}
        </article>
      )}

      {items.length === 0 ? (
        <p className="empty-notebook">还没有保存的词条，查询后点「保存到笔记本」</p>
      ) : (
        <ul className="notebook-list">
          {items.map((item) => (
            <li key={item.id} className="card notebook-item">
              <button type="button" className="item-main" onClick={() => onOpenEntry(item)}>
                <span className="item-query">{item.query}</span>
                <span className="item-target">{item.targetText}</span>
                <span className="item-lang">{LANG_NAMES[item.targetLang]}</span>
              </button>
              <div className="item-actions">
                <SpeechButton text={item.targetText} lang={item.targetLang} small />
                <button
                  type="button"
                  className="icon-btn danger"
                  onClick={() => onRemove(item.id)}
                  aria-label="删除"
                >
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
