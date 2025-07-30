import React from 'react';
import styles from './CharacterSprite.module.css';

// position: 'left', 'center', 'right'
// visible: true/false para controlar fades
const CharacterSprite = ({ image, position, visible = true }) => {
  
  const spriteStyle = {
    opacity: visible ? 1 : 0,
    // Puedes añadir más lógica para la posición aquí
  };

  return (
    <img 
      src={image} 
      className={`${styles.sprite} ${styles[position]}`}
      style={spriteStyle}
      alt="character sprite"
    />
  );
};

export default CharacterSprite;
