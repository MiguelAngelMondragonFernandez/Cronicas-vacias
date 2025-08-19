import React, { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { SaveProvider } from './context/SaveContext';
import MainMenu from './components/MainMenu/MainMenu';
import ChapterSelect from './components/ChapterSelect/ChapterSelect';
import GameScreen from './components/GameScreen/GameScreen';
import SettingsMenu from './components/SettingsMenu/SettingsMenu';
import SaveMenu from './components/SaveMenu/SaveMenu';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('mainMenu');
  const [previousGameState, setPreviousGameState] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentGameState, setCurrentGameState] = useState(null);
  const [saveMenuMode, setSaveMenuMode] = useState('save');
  const [gameSceneId, setGameSceneId] = useState('start');
  const [playerChoices, setPlayerChoices] = useState([]);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const handleStartGame = (chapterId) => {
    setCurrentChapter(chapterId);
    setGameSceneId('start');
    setPlayerChoices([]);
    setGameState('inGame');
  };

  const handleChapterSelect = () => {
    setGameState('chapterSelect');
  };

  const handleReturnToMenu = () => {
    setGameState('mainMenu');
    setCurrentChapter(null);
    setGameSceneId('start');
    setPlayerChoices([]);
  };

  const handleOpenSettings = () => {
    setPreviousGameState(gameState);
    setGameState('settingsMenu');
  };

  const handleCloseSettings = () => {
    setIsMenuClosing(true);
  };

  const handleOpenSaveMenu = (gameStateData) => {
    setCurrentGameState(gameStateData);
    setSaveMenuMode('save');
    setPreviousGameState(gameState);
    setGameState('saveMenu');
  };

  const handleOpenLoadMenu = () => {
    setSaveMenuMode('load');
    setPreviousGameState(gameState);
    setGameState('saveMenu');
  };

  const handleCloseSaveMenu = () => {
    setIsMenuClosing(true);
  };

  const handleLoadGame = (saveData) => {
    setCurrentChapter(saveData.chapterId);
    setGameSceneId(saveData.currentScene || 'start');
    setPlayerChoices(saveData.playerChoices || []);
    setGameState('inGame');
  };

  const onAnimationEnd = () => {
    if (isMenuClosing) {
      setGameState(previousGameState || 'mainMenu');
      setPreviousGameState(null);
      setCurrentGameState(null);
      setIsMenuClosing(false);
    }
  };

  const renderGameState = () => {
    const isMenuOpen = gameState === 'settingsMenu' || gameState === 'saveMenu';

    if (gameState === 'inGame' || gameState === 'settingsMenu' || gameState === 'saveMenu') {
      return (
        <>
          <GameScreen 
            chapterId={currentChapter} 
            onReturnToMenu={handleReturnToMenu} 
            onOpenSettings={handleOpenSettings}
            onOpenSaveMenu={handleOpenSaveMenu}
            onOpenLoadMenu={handleOpenLoadMenu}
            initialSceneId={gameSceneId}
            initialChoices={playerChoices}
            isMenuOpen={isMenuOpen}
          />
          {gameState === 'settingsMenu' && 
            <div className={`overlay ${isMenuClosing ? 'closing' : ''}`} onAnimationEnd={onAnimationEnd}>
              <SettingsMenu onBack={handleCloseSettings} />
            </div>
          }
          {gameState === 'saveMenu' && 
            <div className={`overlay ${isMenuClosing ? 'closing' : ''}`} onAnimationEnd={onAnimationEnd}>
              <SaveMenu 
                onBack={handleCloseSaveMenu} 
                onLoadGame={handleLoadGame}
                gameState={currentGameState}
                mode={saveMenuMode}
              />
            </div>
          }
        </>
      );
    }

    switch (gameState) {
      case 'chapterSelect':
        return <ChapterSelect onSelectChapter={handleStartGame} onBack={handleReturnToMenu} />;
      case 'mainMenu':
      default:
        return <MainMenu onStartGame={handleStartGame} onChapterSelect={handleChapterSelect} onOptions={handleOpenSettings} onLoadGame={handleOpenLoadMenu} />;
    }
  };

  return (
    <SettingsProvider>
      <SaveProvider>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#333' }}>
          {renderGameState()}
        </div>
      </SaveProvider>
    </SettingsProvider>
  );
}

export default App;
