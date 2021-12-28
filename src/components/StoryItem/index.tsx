import Link from 'next/link';
import React from 'react';
import { TSerieStory } from '../StoryList';
import styles from './StoryItem.module.scss';

export default function StoryItem({
  id,
  backdrop_path: imageBackground,
  name,
}: TSerieStory) {
  return (
    <li className={styles.cardContainer}>
      <div className={styles.container}>
        <Link href={`/info/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${imageBackground}`}
            alt={name}
            className={styles.img}
            draggable={false}
          />
        </Link>
      </div>
      <span className={styles.serieName}>{name.length > 15 ? name.slice(0,15).concat('...') : name}</span>
    </li>
  );
}
