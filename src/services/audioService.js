import { Howl } from 'howler';

let sounds = {};
let currentBgm = null;

const audioFiles = {
  bgm_main_theme: '/audio/main_theme.mp3',
  bgm_school: '/audio/school_bgm.mp3',
  sfx_click: '/audio/click.wav',
};

export const preloadAudio = () => {
  for (const key in audioFiles) {
    if (!sounds[key]) {
      sounds[key] = new Howl({
        src: [audioFiles[key]],
        loop: key.startsWith('bgm'),
        html5: true,
      });
    }
  }
};

export const playBgm = (key, volume = 0.5) => {
  if (currentBgm && currentBgm !== sounds[key]) {
    currentBgm.stop();
  }
  if (!sounds[key]) return console.error(`BGM "${key}" no encontrado.`);
  
  currentBgm = sounds[key];
  if (!currentBgm.playing()) {
    currentBgm.volume(volume);
    currentBgm.play();
  }
};

export const playSfx = (key, volume = 0.7) => {
  if (!sounds[key]) return console.error(`SFX "${key}" no encontrado.`);
  sounds[key].volume(volume);
  sounds[key].play();
};

export const updateBgmVolume = (volume) => {
  if (currentBgm) {
    currentBgm.volume(volume);
  }
};

export const updateSfxVolume = (newVolume) => {
  // Actualizar el volumen de todos los efectos de sonido
  for (const key in sounds) {
    if (key.startsWith('sfx')) {
      sounds[key].volume(newVolume);
    }
  }
};

preloadAudio();
