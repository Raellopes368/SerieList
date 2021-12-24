import Link from 'next/link';
import React from 'react';
import { AiOutlineInfoCircle, AiOutlineMore } from 'react-icons/ai';
import styles from './Card.module.scss';

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContent}>
        <h1 className={styles.name}>Vikings</h1>
        <img
          className={styles.img}
          src="https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/04/Vikings.jpeg"
          alt="Vikings"
        />
      </div>
      <footer className={styles.footer}>
        <Link href="/info/0">
          <AiOutlineInfoCircle
            className={styles.icons}
            color="#fff"
            size={30}
          />
        </Link>
        <AiOutlineMore className={styles.icons} color="#fff" size={32} />
      </footer>
    </div>
  );
}
