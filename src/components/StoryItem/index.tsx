import Link from 'next/link';
import React from 'react';
import styles from './StoryItem.module.scss';

export default function StoryItem() {
  return (
    <li className={styles.container}>
      <Link href="/info/0">
        <img
          src="https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/04/Vikings.jpeg"
          alt="Vikings"
          className={styles.img}
          draggable={false}
        />
      </Link>
    </li>
  );
}
