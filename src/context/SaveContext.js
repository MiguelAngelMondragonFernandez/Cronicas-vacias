import React, { createContext, useContext, useState, useCallback } from 'react';
import saveSystem from '../services/saveSystem';

const SaveContext = createContext();

export const useSave = () => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useSave must be used within a SaveProvider');
  }
  return context;
};

export const SaveProvider = ({ children }) => {
  const [saves, setSaves] = useState(saveSystem.getAllSaves());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshSaves = useCallback(() => {
    setSaves(saveSystem.getAllSaves());
  }, []);

  const saveGame = useCallback(async (gameState, slot = null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = saveSystem.saveGame(gameState, slot);
      if (result.success) {
        refreshSaves();
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = 'Error al guardar la partida';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [refreshSaves]);

  const loadGame = useCallback(async (slot) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = saveSystem.loadGame(slot);
      if (result.success) {
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = 'Error al cargar la partida';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSave = useCallback(async (slot) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = saveSystem.deleteSave(slot);
      if (result.success) {
        refreshSaves();
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      const errorMessage = 'Error al eliminar la partida';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [refreshSaves]);

  const quickSave = useCallback(async (gameState) => {
    return await saveGame(gameState, 0);
  }, [saveGame]);

  const quickLoad = useCallback(async () => {
    return await loadGame(0);
  }, [loadGame]);

  const hasQuickSave = useCallback(() => {
    return saveSystem.hasQuickSave();
  }, []);

  const exportSaves = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = saveSystem.exportSaves();
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = 'Error al exportar las partidas';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const importSaves = useCallback(async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await saveSystem.importSaves(file);
      if (result.success) {
        refreshSaves();
      } else {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = 'Error al importar las partidas';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [refreshSaves]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    saves,
    isLoading,
    error,
    saveGame,
    loadGame,
    deleteSave,
    quickSave,
    quickLoad,
    hasQuickSave,
    exportSaves,
    importSaves,
    refreshSaves,
    clearError
  };

  return (
    <SaveContext.Provider value={value}>
      {children}
    </SaveContext.Provider>
  );
};