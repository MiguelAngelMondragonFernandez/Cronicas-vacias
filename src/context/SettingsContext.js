import React, { createContext, useState, useEffect } from 'react';

const defaultSettings = {
  textSpeed: 50,
  bgmVolume: 0.5,
  sfxVolume: 0.7,
  fontSize: 1.6,
  uiColor: '#5a8bd8',
};

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('vn_settings');
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    } catch (error) {
      console.error("No se pudo cargar la configuración:", error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vn_settings', JSON.stringify(settings));
    } catch (error) {
      console.error("No se pudo guardar la configuración:", error);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const value = { settings, updateSetting };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
