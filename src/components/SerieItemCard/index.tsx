import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineInfoCircle, AiOutlineMore } from 'react-icons/ai';
import { TSerieItem } from '../../pages';
import SerieOptions from '../SerieOptions';
import styles from './SerieItemCard.module.scss';

export default function SerieItemCard({
  name,
  image,
  watched,
  serieId,
  id
}: TSerieItem) {
  const [seeOptions, setSeeOptions] = useState(false);
  return (
    <div className={styles.container}>
      {seeOptions && (
        <SerieOptions
          setSeeOptions={setSeeOptions}
          watched={watched}
          image={image}
          serieId={serieId}
          name={name}
          id={id}
        />
      )}
      <div className={styles.imageContent}>
        <h1 className={styles.name}>{name}</h1>
        <img className={styles.img} src={image} alt={name} />
      </div>
      <footer className={styles.footer}>
        <Link href={`/info/${serieId}`}>
          <AiOutlineInfoCircle
            className={styles.icons}
            color="#fff"
            size={30}
          />
        </Link>
        <AiOutlineMore
          className={styles.icons}
          color="#fff"
          size={32}
          onClick={() => setSeeOptions(!seeOptions)}
        />
      </footer>
    </div>
  );
}
