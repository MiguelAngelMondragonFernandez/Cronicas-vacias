import React, { useState, useEffect, useContext } from 'react';
import { storyData } from '../../story';
import { SettingsContext } from '../../context/SettingsContext';
import { useSave } from '../../context/SaveContext';
import * as audio from '../../services/audioService';

import GameContainer from '../GameContainer/GameContainer';
import Background from '../Background/Background';
import CharacterSprite from '../CharacterSprite/CharacterSprite';
import DialogueBox from '../DialogueBox/DialogueBox';
import ChoiceBox from '../ChoiceBox/ChoiceBox'; 

import styles from './GameScreen.module.css';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

function GameScreen({ chapterId, onReturnToMenu, onOpenSettings, onOpenSaveMenu, onOpenLoadMenu, initialSceneId = 'start', initialChoices = [], isMenuOpen }) {
  const { settings } = useContext(SettingsContext);
  const { quickSave, quickLoad, hasQuickSave } = useSave();
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId);
  const [playerChoices, setPlayerChoices] = useState(initialChoices);
  const [gameVariables, setGameVariables] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const chapterScript = chapterId ? storyData[chapterId].script : {};
  const currentScene = chapterId ? chapterScript[currentSceneId] : {};

  useEffect(() => {
      if (chapterId && currentScene?.bgm) {
          audio.playBgm(currentScene.bgm, settings.bgmVolume);
      }
  }, [currentSceneId, settings.bgmVolume, chapterId]);

  if (!chapterId) {
    return null;
  }
  
  const handleNext = (nextSceneId) => {
    if (nextSceneId) {
      setCurrentSceneId(nextSceneId);
    } else {
      alert(`Fin del ${storyData[chapterId].title}`);
      onReturnToMenu();
    }
  };

  const handleDialogueClick = () => {
    if (isMenuOpen) return;
    if (currentScene.type !== 'choice') {
      audio.playSfx('sfx_click', settings.sfxVolume);
      if (currentScene.end) {
        alert(`Fin del ${storyData[chapterId].title}`);
        onReturnToMenu();
      } else if (currentScene.next) {
        handleNext(currentScene.next);
      } else {
        console.warn(`La escena "${currentSceneId}" no tiene propiedad 'next' ni 'end'. El juego está atascado.`);
      }
    }
  };
  
  const handleChoiceSelect = (nextSceneId, choiceText) => {
    audio.playSfx('sfx_click', settings.sfxVolume);
    
    // Track player choice
    const choice = {
      sceneId: currentSceneId,
      choice: choiceText,
      nextScene: nextSceneId,
      timestamp: Date.now()
    };
    setPlayerChoices(prev => [...prev, choice]);
    
    handleNext(nextSceneId);
  };

  const getCurrentGameState = () => {
    return {
      chapterId,
      currentScene: currentSceneId,
      playerChoices,
      gameVariables,
      timestamp: Date.now()
    };
  };

  const handleQuickSave = async (e) => {
    e.stopPropagation();
    const gameState = getCurrentGameState();
    const result = await quickSave(gameState);
    if (result.success) {
      // You could add a toast notification here
      console.log('Quick save successful');
    }
  };

  const handleQuickLoad = async (e) => {
    e.stopPropagation();
    const result = await quickLoad();
    if (result.success && result.saveData) {
      // Load the game state
      setCurrentSceneId(result.saveData.currentScene);
      setPlayerChoices(result.saveData.playerChoices || []);
      setGameVariables(result.saveData.gameVariables || {});
    }
  };

  const handleOpenSave = (e) => {
    e.stopPropagation();
    const gameState = getCurrentGameState();
    onOpenSaveMenu(gameState);
  };

  const handleOpenLoad = (e) => {
    e.stopPropagation();
    onOpenLoadMenu();
  };
  
  if (!currentScene) {
    return <div>Error: Escena no encontrada ({currentSceneId})</div>;
  }
  
  return (
    <div onClick={handleDialogueClick}>
      <GameContainer>
        <Background image={currentScene.background} />
        
        {currentScene.sprites && currentScene.sprites.map(sprite => (
          <CharacterSprite key={sprite.id} {...sprite} />
        ))}
        
        {currentScene.type !== 'choice' && (
          <DialogueBox
            key={currentSceneId}
            character={currentScene.character}
            text={currentScene.text}
            isPaused={isMenuOpen || showConfirmDialog}
          />
        )}
        
        {currentScene.type === 'choice' && (
          <ChoiceBox 
            choices={currentScene.choices} 
            onSelect={(nextSceneId, choiceText) => handleChoiceSelect(nextSceneId, choiceText)} 
          />
        )}

        <div className={styles.gameControls}>
          <button onClick={handleQuickSave} className={styles.controlButton}>
            Guardado Rápido
          </button>
          <button 
            onClick={handleQuickLoad} 
            className={styles.controlButton}
            disabled={!hasQuickSave()}
          >
            Carga Rápida
          </button>
          <button onClick={handleOpenSave} className={styles.controlButton}>
            Guardar
          </button>
          <button onClick={handleOpenLoad} className={styles.controlButton}>
            Cargar
          </button>
          <button onClick={(e) => { e.stopPropagation(); onOpenSettings(); }} className={styles.controlButton}>
            Opciones
          </button>
          <button onClick={(e) => { 
            e.stopPropagation(); 
            setShowConfirmDialog(true);
          }} className={styles.controlButton}>
            Menú Principal
          </button>
        </div>

        {showConfirmDialog && (
          <ConfirmDialog
            message="¿Estás seguro de que quieres regresar al menú principal? El progreso no guardado se perderá."
            onConfirm={onReturnToMenu}
            onCancel={() => setShowConfirmDialog(false)}
          />
        )}
      </GameContainer>
    </div>
  );
}

export default GameScreen;