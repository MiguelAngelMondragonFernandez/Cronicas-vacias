import { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export const useTypewriter = (text) => {
  const { settings } = useContext(SettingsContext);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, settings.textSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, settings.textSpeed]);

  return displayText;
};
