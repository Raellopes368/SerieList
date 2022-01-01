import Link from 'next/link';
import React from 'react';
import { AiOutlineInfoCircle, AiOutlineMore } from 'react-icons/ai';
import { TSerieItem } from '../../pages';
import styles from './Card.module.scss';

export default function Card({ name, image, serieId}: TSerieItem) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContent}>
        <h1 className={styles.name}>Vikings</h1>
        <img
          className={styles.img}
          src={image}
          alt={name}
        />
      </div>
      <footer className={styles.footer}>
        <Link href={`/info/${serieId}`}>
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
