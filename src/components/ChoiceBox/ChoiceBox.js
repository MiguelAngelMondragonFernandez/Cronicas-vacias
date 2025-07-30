import React from 'react';
import styles from './ChoiceBox.module.css';
import { motion } from 'framer-motion';

const ChoiceBox = ({ choices, onSelect }) => {
  return (
    <div className={styles.choiceOverlay}>
      <motion.div 
        className={styles.choiceContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {choices.map((choice, index) => (
          <motion.button
            key={index}
            className={styles.choiceButton}
            onClick={() => onSelect(choice.next, choice.text)}
            whileHover={{ scale: 1.05, backgroundColor: '#5a8bd8' }}
            whileTap={{ scale: 0.95 }}
          >
            {choice.text}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default ChoiceBox;
