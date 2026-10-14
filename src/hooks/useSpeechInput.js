import { useCallback, useEffect, useRef, useState } from 'react';

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;

const ERROR_MESSAGES = {
  'not-allowed': 'Доступ к микрофону запрещён. Разрешите его в настройках браузера.',
  'service-not-allowed': 'Доступ к микрофону запрещён. Разрешите его в настройках браузера.',
  'no-speech': 'Речь не распознана. Попробуйте ещё раз.',
  'audio-capture': 'Микрофон не найден.',
  network: 'Нет связи с сервисом распознавания речи.',
};

// Диктовка через Web Speech API. onResult(text) вызывается с итоговой фразой.
export function useSpeechInput({ onResult, lang = 'ru-RU' }) {
  const [isListening, setIsListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    if (!SpeechRecognition || recognitionRef.current) return;
    setError('');
    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = false;

    rec.onresult = (event) => {
      let finalText = '';
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += chunk;
        else interimText += chunk;
      }
      setInterim(interimText);
      if (finalText.trim()) onResultRef.current(finalText.trim());
    };
    rec.onerror = (event) => {
      if (event.error !== 'aborted') {
        setError(ERROR_MESSAGES[event.error] || 'Не удалось распознать речь.');
      }
    };
    rec.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
      setInterim('');
    };

    recognitionRef.current = rec;
    setIsListening(true);
    try {
      rec.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, [lang]);

  const toggle = useCallback(() => {
    if (recognitionRef.current) stop();
    else start();
  }, [start, stop]);

  return {
    supported: Boolean(SpeechRecognition),
    isListening,
    interim,
    error,
    toggle,
    stop,
  };
}
