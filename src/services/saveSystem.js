class SaveSystem {
  constructor() {
    this.saveKey = 'cv_save_data';
    this.maxSaves = 10;
  }

  createSaveData(gameState) {
    return {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      chapterId: gameState.chapterId,
      currentScene: gameState.currentScene,
      gameVariables: gameState.gameVariables || {},
      playerChoices: gameState.playerChoices || [],
      screenshot: gameState.screenshot || null,
      displayName: this.generateDisplayName(gameState)
    };
  }

  generateDisplayName(gameState) {
    const chapter = gameState.chapterId ? `Capítulo ${gameState.chapterId.replace('chapter', '')}` : 'Inicio';
    const date = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${chapter} - ${date}`;
  }

  getAllSaves() {
    try {
      const saves = localStorage.getItem(this.saveKey);
      return saves ? JSON.parse(saves) : [];
    } catch (error) {
      console.error('Error loading saves:', error);
      return [];
    }
  }

  saveGame(gameState, slot = null) {
    try {
      const saves = this.getAllSaves();
      const saveData = this.createSaveData(gameState);
      
      if (slot !== null && slot >= 0 && slot < this.maxSaves) {
        saves[slot] = saveData;
      } else {
        saves.push(saveData);
        if (saves.length > this.maxSaves) {
          saves.shift();
        }
      }

      localStorage.setItem(this.saveKey, JSON.stringify(saves));
      return { success: true, saveData };
    } catch (error) {
      console.error('Error saving game:', error);
      return { success: false, error: error.message };
    }
  }

  loadGame(slot) {
    try {
      const saves = this.getAllSaves();
      if (slot >= 0 && slot < saves.length && saves[slot]) {
        return { success: true, saveData: saves[slot] };
      }
      return { success: false, error: 'Save slot not found' };
    } catch (error) {
      console.error('Error loading game:', error);
      return { success: false, error: error.message };
    }
  }

  deleteSave(slot) {
    try {
      const saves = this.getAllSaves();
      if (slot >= 0 && slot < saves.length) {
        saves.splice(slot, 1);
        localStorage.setItem(this.saveKey, JSON.stringify(saves));
        return { success: true };
      }
      return { success: false, error: 'Save slot not found' };
    } catch (error) {
      console.error('Error deleting save:', error);
      return { success: false, error: error.message };
    }
  }

  quickSave(gameState) {
    return this.saveGame(gameState, 0);
  }

  quickLoad() {
    return this.loadGame(0);
  }

  hasQuickSave() {
    const saves = this.getAllSaves();
    return saves.length > 0 && saves[0] !== null;
  }

  exportSaves() {
    try {
      const saves = this.getAllSaves();
      const dataStr = JSON.stringify(saves, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `cv_saves_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (error) {
      console.error('Error exporting saves:', error);
      return { success: false, error: error.message };
    }
  }

  importSaves(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const saves = JSON.parse(e.target.result);
          if (Array.isArray(saves)) {
            localStorage.setItem(this.saveKey, JSON.stringify(saves));
            resolve({ success: true });
          } else {
            resolve({ success: false, error: 'Invalid save file format' });
          }
        } catch (error) {
          resolve({ success: false, error: 'Error parsing save file' });
        }
      };
      reader.readAsText(file);
    });
  }
}

export default new SaveSystem();