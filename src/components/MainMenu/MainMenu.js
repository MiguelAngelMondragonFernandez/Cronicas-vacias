import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { useSave } from '../../context/SaveContext';
import * as audio from '../../services/audioService';
import styles from './MainMenu.module.css';
import bgMenu from '../../assets/backgrounds/school_gate.jpg';

const MainMenu = ({ onStartGame, onChapterSelect, onOptions, onLoadGame }) => {
  const { settings } = useContext(SettingsContext);
  const { saves } = useSave();

  const handleStart = () => {
    audio.playBgm('bgm_main_theme', settings.bgmVolume);
    onStartGame('chapter1');
  };

  const handleChapterSelectClick = () => {
    audio.playBgm('bgm_main_theme', settings.bgmVolume);
    onChapterSelect();
  };

  const handleLoadClick = () => {
    audio.playSfx('sfx_click', settings.sfxVolume);
    onLoadGame();
  };

  const handleExitClick = () => {
    audio.playSfx('sfx_click', settings.sfxVolume);
    if (window.confirm('¿Estás seguro de que quieres salir?')) {
      window.close();
    }
  };

  const hasSaves = saves && saves.length > 0 && saves.some(save => save !== null);

  return (
    <div className={styles.menuContainer} style={{ backgroundImage: `url(${bgMenu})` }}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Mi Novela Visual</h1>
        <nav className={styles.navMenu}>
          <button onClick={handleStart}>Comenzar</button>
          <button onClick={handleChapterSelectClick}>Selección de Capítulo</button>
          <button onClick={onOptions}>Opciones</button>
          <button onClick={handleLoadClick} disabled={!hasSaves}>Cargar</button>
          <button onClick={handleExitClick}>Salir</button>
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
