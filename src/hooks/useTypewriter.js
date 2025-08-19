import { useState, useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export const useTypewriter = (text, isPaused = false) => {
  const { settings } = useContext(SettingsContext);
  const [displayText, setDisplayText] = useState('');
  const currentIndex = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayText('');
    currentIndex.current = 0;
  }, [text]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        if (currentIndex.current < text.length) {
          setDisplayText(text.substring(0, currentIndex.current + 1));
          currentIndex.current += 1;
        } else {
          clearInterval(intervalRef.current);
        }
      }, settings.textSpeed);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [text, settings.textSpeed, isPaused]);

  return displayText;
};