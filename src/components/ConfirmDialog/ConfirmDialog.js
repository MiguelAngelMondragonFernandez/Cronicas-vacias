import React, { useState } from 'react';
import styles from './ConfirmDialog.module.css';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [actionToPerform, setActionToPerform] = useState(null);

  const handleConfirm = (e) => {
    e.stopPropagation();
    setActionToPerform(() => onConfirm);
    setIsClosing(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setActionToPerform(() => onCancel);
    setIsClosing(true);
  };

  const onAnimationEnd = () => {
    if (isClosing && actionToPerform) {
      actionToPerform();
    }
  };

  return (
    <div className={styles.overlay} onAnimationEnd={onAnimationEnd}>
      <div className={`${styles.dialog} ${isClosing ? styles.closing : ''}`}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button onClick={handleConfirm} className={styles.confirmButton}>Confirmar</button>
          <button onClick={handleCancel} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
