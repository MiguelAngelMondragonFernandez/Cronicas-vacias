import { Howl } from 'howler';
import mainTheme from '../assets/sounds/main_theme.mp3';
import schoolBgm from '../assets/sounds/school_bgm.mp3';
import clickSfx from '../assets/sounds/click.wav';
import echoesOfTomorrow from '../assets/sounds/Echoes of Tomorrow.mp3';
import elysiumHorizon from '../assets/sounds/Elysium Horizon.mp3';
import sereneHorizons from '../assets/sounds/Serene Horizons.mp3';
import shadowsOfTomorrow from '../assets/sounds/Shadows of Tomorrow.mp3';
import veilsOfNight from '../assets/sounds/Veils of Night.mp3';

let sounds = {
  bgm_main_theme: new Howl({ src: [mainTheme], loop: true, html5: true }),
  bgm_school: new Howl({ src: [schoolBgm], loop: true, html5: true }),
  sfx_click: new Howl({ src: [clickSfx], html5: true }),
  bgm_echoes_of_tomorrow: new Howl({ src: [echoesOfTomorrow], loop: true, html5: true }),
  bgm_elysium_horizon: new Howl({ src: [elysiumHorizon], loop: true, html5: true }),
  bgm_serene_horizons: new Howl({ src: [sereneHorizons], loop: true, html5: true }),
  bgm_shadows_of_tomorrow: new Howl({ src: [shadowsOfTomorrow], loop: true, html5: true }),
  bgm_veils_of_night: new Howl({ src: [veilsOfNight], loop: true, html5: true }),
};
let currentBgm = null;

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
