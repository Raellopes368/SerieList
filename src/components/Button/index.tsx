/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  title: string;
  onClick: (props?: any) => void;
};

export default function Button({ onClick, title }: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" className={styles.button} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}
