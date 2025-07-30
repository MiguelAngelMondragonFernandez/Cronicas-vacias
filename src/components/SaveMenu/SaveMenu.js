import React, { useState, useRef } from 'react';
import { useSave } from '../../context/SaveContext';
import styles from './SaveMenu.module.css';

const SaveMenu = ({ onBack, onLoadGame, gameState, mode = 'save' }) => {
  const { 
    saves, 
    isLoading, 
    error, 
    saveGame, 
    loadGame, 
    deleteSave, 
    exportSaves, 
    importSaves,
    clearError 
  } = useSave();
  
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const fileInputRef = useRef(null);

  const handleSave = async (slot) => {
    if (!gameState) return;
    
    const result = await saveGame(gameState, slot);
    if (result.success) {
      // Visual feedback could be added here
    }
  };

  const handleLoad = async (slot) => {
    const result = await loadGame(slot);
    if (result.success && onLoadGame) {
      onLoadGame(result.saveData);
    }
  };

  const handleDelete = async (slot) => {
    await deleteSave(slot);
    setShowConfirmDelete(null);
  };

  const handleExport = async () => {
    await exportSaves();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await importSaves(file);
      event.target.value = '';
    }
  };

  const renderSaveSlot = (save, index) => {
    return (
      <div key={index} className={styles.saveSlot}>
        <div 
          className={`${styles.saveSlotContent} ${selectedSlot === index ? styles.selected : ''}`}
          onClick={() => setSelectedSlot(index)}
        >
          {save ? (
            <>
              <div className={styles.saveInfo}>
                <div className={styles.saveName}>{save.displayName}</div>
                <div className={styles.saveDetails}>
                  {save.chapterId && `Capítulo: ${save.chapterId.replace('chapter', '')}`}
                  {save.currentScene && ` - Escena: ${save.currentScene}`}
                </div>
                <div className={styles.saveTimestamp}>
                  {new Date(save.timestamp).toLocaleString('es-ES')}
                </div>
              </div>
              {save.screenshot && (
                <div className={styles.saveScreenshot}>
                  <img src={save.screenshot} alt="Save screenshot" />
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptySave}>
              <span>Partida vacía</span>
            </div>
          )}
        </div>
        
        <div className={styles.saveActions}>
          {mode === 'save' && (
            <button 
              className={styles.actionButton}
              onClick={() => handleSave(index)}
              disabled={isLoading}
            >
              Guardar
            </button>
          )}
          
          {mode === 'load' && save && (
            <button 
              className={styles.actionButton}
              onClick={() => handleLoad(index)}
              disabled={isLoading}
            >
              Cargar
            </button>
          )}
          
          {save && (
            <button 
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => setShowConfirmDelete(index)}
              disabled={isLoading}
            >
              Eliminar
            </button>
          )}
        </div>

        {showConfirmDelete === index && (
          <div className={styles.confirmDialog}>
            <p>¿Eliminar esta partida guardada?</p>
            <div className={styles.confirmActions}>
              <button 
                className={styles.confirmButton}
                onClick={() => handleDelete(index)}
              >
                Sí
              </button>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowConfirmDelete(null)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.saveMenu}>
      <div className={styles.header}>
        <h2>{mode === 'save' ? 'Guardar Partida' : 'Cargar Partida'}</h2>
        <button className={styles.backButton} onClick={onBack}>
          Volver
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={clearError}>Cerrar</button>
        </div>
      )}

      <div className={styles.saveSlots}>
        {Array.from({ length: 10 }, (_, index) => {
          const save = saves[index] || null;
          return renderSaveSlot(save, index);
        })}
      </div>

      <div className={styles.footer}>
        <div className={styles.utilityButtons}>
          <button 
            className={styles.utilityButton}
            onClick={handleExport}
            disabled={isLoading || saves.length === 0}
          >
            Exportar Partidas
          </button>
          
          <button 
            className={styles.utilityButton}
            onClick={handleImportClick}
            disabled={isLoading}
          >
            Importar Partidas
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Procesando...</p>
        </div>
      )}
    </div>
  );
};

export default SaveMenu;