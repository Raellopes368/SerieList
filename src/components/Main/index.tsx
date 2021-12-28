import React from 'react';
import Card from '../Card';
import styles from './Main.module.scss';

export default function Main() {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
    </div>
  );
}
