import React from 'react';
import SerieItemCard from '../SerieItemCard';
import { TSerieItem } from '../../pages';
import styles from './SerieIListItem.module.scss';

type SerieListItemProps = {
  series: TSerieItem[];
  title: string;
}

export default function SerieListItem({ series, title }: SerieListItemProps) {
  return (
    <section className={styles.mainContainer}>
      <h2>{title}: </h2>
      <main className={styles.container}>
        {series.map(serie => (
          <SerieItemCard {...serie} key={serie.id}/>
        ))}
      </main>
    </section>
  );
}
