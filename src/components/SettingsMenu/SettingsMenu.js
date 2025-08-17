import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import * as audio from '../../services/audioService';
import styles from './SettingsMenu.module.css';

const SettingsMenu = ({ onBack }) => {
  const { settings, updateSetting } = useContext(SettingsContext);

  const handleBgmChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    updateSetting('bgmVolume', newVolume);
    audio.updateBgmVolume(newVolume);
  };

  const handleSfxChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    updateSetting('sfxVolume', newVolume);
    audio.updateSfxVolume(newVolume);
    audio.playSfx('sfx_click', newVolume);
  };

  const handleColorChange = (e) => {
    updateSetting('uiColor', e.target.value);
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--ui-color-primary', settings.uiColor);
  }, [settings.uiColor]);

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Configuración</h2>
      <div className={styles.options}>
        <label>Velocidad del Texto</label>
        <input 
          type="range" min="10" max="100" step="10"
          value={110 - settings.textSpeed} 
          onChange={(e) => {
            const value = parseInt(e.target.value);
            const invertedValue = 110 - value;
            updateSetting('textSpeed', invertedValue);
          }} />

        <label>Volumen de Música (BGM)</label>
        <input 
          type="range" min="0" max="1" step="0.1" 
          value={settings.bgmVolume} 
          onChange={handleBgmChange} />
          
        <label>Volumen de Efectos (SFX)</label>
        <input 
          type="range" min="0" max="1" step="0.1" 
          value={settings.sfxVolume} 
          onChange={handleSfxChange} />

        <label>Tamaño de Fuente</label>
        <input
          type="range" min="1.2" max="2.2" step="0.1"
          value={settings.fontSize}
          onChange={(e) => updateSetting('fontSize', parseFloat(e.target.value))} />

        <label>Color de la Interfaz</label>
        <input
          type="color"
          value={settings.uiColor}
          onChange={handleColorChange} />
      </div>
      <button className={styles.backButton} onClick={onBack}>Volver</button>
    </div>
  );
};

export default SettingsMenu;
