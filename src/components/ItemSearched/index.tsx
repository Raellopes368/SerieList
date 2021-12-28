/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import { SerieInformation } from '../../pages/search';
import styles from './ItemSearched.module.scss';

export default function ItemSearched({
  name,
  description,
  id,
  image,
}: SerieInformation) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.row}>
          <h3 className={styles.title}>{name}</h3>
          <Link href={`/info/${id}`}>
            <a className={styles.link}>Ver mais</a>
          </Link>
        </div>
        <p className={styles.textInfo}>
          {description.length > 80
            ? description.slice(0, 80).concat('...')
            : description}
        </p>
      </div>
    </div>
  );
}
