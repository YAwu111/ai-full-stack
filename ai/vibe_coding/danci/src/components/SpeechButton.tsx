import type { LangCode } from '../constants/languages';
import { useSpeech } from '../hooks/useSpeech';

interface Props {
  text: string;
  lang: LangCode;
  label?: string;
  small?: boolean;
}

export function SpeechButton({ text, lang, label = '朗读', small }: Props) {
  const { speak } = useSpeech();

  return (
    <button
      type="button"
      className={`speech-btn ${small ? 'speech-btn--sm' : ''}`}
      onClick={() => speak(text, lang)}
      aria-label={label}
      title={label}
    >
      <span className="speech-icon" aria-hidden>
        🔊
      </span>
      {!small && <span>{label}</span>}
    </button>
  );
}
