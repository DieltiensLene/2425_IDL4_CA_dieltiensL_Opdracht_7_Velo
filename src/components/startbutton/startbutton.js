import React from 'react';
import styles from './page.module.css';

const StartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      Start
    </button>
  );
};

export default StartButton;
