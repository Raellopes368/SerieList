import React from 'react';
import Card from '../Card';
import { TSerieItem } from '../../pages';
import styles from './Main.module.scss';

type MainProps = {
  series: TSerieItem[]
}

export default function Main({ series }: MainProps) {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.container}>
        {series.map(serie => (
          <Card {...serie} />
        ))}
      </main>
    </div>
  );
}
