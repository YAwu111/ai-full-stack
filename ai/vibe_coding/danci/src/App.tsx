import { useEffect, useState } from 'react';
import { LanguageSetup } from './components/LanguageSetup';
import { NotebookPage } from './components/NotebookPage';
import { ResultPage } from './components/ResultPage';
import { SearchPage } from './components/SearchPage';
import { checkHealth } from './services/api';
import { useNotebook } from './hooks/useNotebook';
import { useSettings } from './hooks/useSettings';
import type { LookupResult } from './types';

type View = 'search' | 'result' | 'notebook';

export default function App() {
  const { settings, saveLanguages, resetSetup } = useSettings();
  const { items, isSaved, save, remove } = useNotebook();
  const [view, setView] = useState<View>('search');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [apiReady, setApiReady] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth()
      .then((h) => setApiReady(h.hasKey))
      .catch(() => setApiReady(false));
  }, []);

  if (!settings.setupComplete) {
    return (
      <div className="app">
        <LanguageSetup
          nativeLang={settings.nativeLang}
          targetLang={settings.targetLang}
          onConfirm={saveLanguages}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {apiReady === false && (
        <div className="api-banner">
          请在项目根目录配置 <code>.env</code> 中的 OPENAI_API_KEY 后重启服务
        </div>
      )}

      {view === 'search' && (
        <SearchPage
          nativeLang={settings.nativeLang}
          targetLang={settings.targetLang}
          onResult={(r) => {
            setResult(r);
            setView('result');
          }}
          onOpenNotebook={() => setView('notebook')}
          onChangeLanguages={resetSetup}
        />
      )}

      {view === 'result' && result && (
        <ResultPage
          result={result}
          saved={isSaved(result.id)}
          onSave={() => save(result)}
          onBack={() => setView('search')}
        />
      )}

      {view === 'notebook' && (
        <NotebookPage
          items={items}
          nativeLang={settings.nativeLang}
          targetLang={settings.targetLang}
          onBack={() => setView('search')}
          onOpenEntry={(entry) => {
            setResult(entry);
            setView('result');
          }}
          onRemove={remove}
        />
      )}
    </div>
  );
}
