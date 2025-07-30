import React from 'react';
import { storyData } from '../../story';
import styles from './ChapterSelect.module.css';
import bgMenu from '../../assets/backgrounds/school_gate.jpg';

const ChapterSelect = ({ onSelectChapter, onBack }) => {
  return (
    <div className={styles.chapterContainer} style={{ backgroundImage: `url(${bgMenu})` }}>
      <div className={styles.overlay}>
        <h2 className={styles.title}>Seleccionar Capítulo</h2>
        <div className={styles.chapterList}>
          {Object.values(storyData).map(chapter => (
            <button 
              key={chapter.id} 
              onClick={() => onSelectChapter(chapter.id)}
            >
              {chapter.title}
            </button>
          ))}
        </div>
        <button className={styles.backButton} onClick={onBack}>Volver</button>
      </div>
    </div>
  );
};

export default ChapterSelect;
