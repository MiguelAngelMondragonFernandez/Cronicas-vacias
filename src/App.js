import React, { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { SaveProvider } from './context/SaveContext';
import MainMenu from './components/MainMenu/MainMenu';
import ChapterSelect from './components/ChapterSelect/ChapterSelect';
import GameScreen from './components/GameScreen/GameScreen';
import SettingsMenu from './components/SettingsMenu/SettingsMenu';
import SaveMenu from './components/SaveMenu/SaveMenu';

function App() {
  const [gameState, setGameState] = useState('mainMenu');
  const [previousGameState, setPreviousGameState] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentGameState, setCurrentGameState] = useState(null);
  const [saveMenuMode, setSaveMenuMode] = useState('save');
  const [gameSceneId, setGameSceneId] = useState('start');
  const [playerChoices, setPlayerChoices] = useState([]);

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
    setGameState(previousGameState || 'mainMenu');
    setPreviousGameState(null);
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
    setGameState(previousGameState || 'mainMenu');
    setPreviousGameState(null);
    setCurrentGameState(null);
  };

  const handleLoadGame = (saveData) => {
    setCurrentChapter(saveData.chapterId);
    setGameSceneId(saveData.currentScene || 'start');
    setPlayerChoices(saveData.playerChoices || []);
    setGameState('inGame');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'inGame':
        return (
          <GameScreen 
            chapterId={currentChapter} 
            onReturnToMenu={handleReturnToMenu} 
            onOpenSettings={handleOpenSettings}
            onOpenSaveMenu={handleOpenSaveMenu}
            onOpenLoadMenu={handleOpenLoadMenu}
            initialSceneId={gameSceneId}
            initialChoices={playerChoices}
          />
        );
      case 'chapterSelect':
        return <ChapterSelect onSelectChapter={handleStartGame} onBack={handleReturnToMenu} />;
      case 'settingsMenu':
        return <SettingsMenu onBack={handleCloseSettings} />;
      case 'saveMenu':
        return (
          <SaveMenu 
            onBack={handleCloseSaveMenu} 
            onLoadGame={handleLoadGame}
            gameState={currentGameState}
            mode={saveMenuMode}
          />
        );
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
