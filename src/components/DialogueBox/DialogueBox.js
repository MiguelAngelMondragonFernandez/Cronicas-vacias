import React, { useContext } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { SettingsContext } from '../../context/SettingsContext';
import styles from './DialogueBox.module.css';

const DialogueBox = ({ character, text }) => {
  const { settings } = useContext(SettingsContext);
  const displayedText = useTypewriter(text);

  return (
    <div className={styles.dialogueBox}>
      {character && <div className={styles.characterName}>{character}</div>}
      <p className={styles.dialogueText} style={{ fontSize: `${settings.fontSize}rem` }}>{displayedText}</p>
    </div>
  );
};

export default DialogueBox;
