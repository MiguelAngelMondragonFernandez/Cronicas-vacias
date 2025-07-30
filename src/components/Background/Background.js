import React from 'react';
import styles from './Background.module.css';

const Background = ({ image }) => {
  return (
    <div 
      className={styles.background} 
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

export default Background;
