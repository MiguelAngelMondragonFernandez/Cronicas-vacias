import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { storyData } from '../../story';
import styles from './ChapterSelect.module.css';
import bgMenu from '../../assets/backgrounds/school_gate.jpg';

const ChapterSelect = ({ onSelectChapter, onBack }) => {
  const chapters = useMemo(() => {
    const arr = Object.values(storyData || {});
    return arr.sort((a, b) => {
      const ai = a.order ?? a.id;
      const bi = b.order ?? b.id;
      return ('' + ai).localeCompare('' + bi, undefined, { numeric: true, sensitivity: 'base' });
    });
  }, []);

  const [focused, setFocused] = useState(0);

  const handleKey = useCallback(
    (e) => {
      if (!chapters.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused((i) => (i + 1) % chapters.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused((i) => (i - 1 + chapters.length) % chapters.length);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const ch = chapters[focused];
        if (!ch?.locked) onSelectChapter(ch.id);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onBack?.();
      }
    },
    [chapters, focused, onSelectChapter, onBack]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div
      className={styles.menuContainer}
      style={{ backgroundImage: `url(${bgMenu})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Seleccionar Capítulo</h1>

        <ul className={styles.list} role="menu" aria-label="Lista de capítulos">
          {chapters.map((chapter, idx) => {
            const isLocked = Boolean(chapter.locked);
            const isActive = idx === focused;

            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  role="menuitem"
                  className={[
                    styles.item,
                    isActive ? styles.active : '',
                    isLocked ? styles.locked : '',
                  ].join(' ')}
                  onMouseEnter={() => setFocused(idx)}
                  onClick={() => !isLocked && onSelectChapter(chapter.id)}
                  disabled={isLocked}
                  aria-disabled={isLocked}
                >
                  <span className={styles.itemTitle}>{chapter.title}</span>

                  {'progress' in chapter ? (
                    <span className={styles.progress} data-value={Math.round(chapter.progress ?? 0)}>
                      <span
                        style={{
                          width: `${Math.min(100, Math.max(0, Number(chapter.progress) || 0))}%`,
                        }}
                      />
                    </span>
                  ) : null}

                  {isLocked ? <span className={styles.badge}>Bloqueado</span> : null}
                </button>
              </li>
            );
          })}
        </ul>

        <button className={styles.backButton} onClick={onBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default ChapterSelect;