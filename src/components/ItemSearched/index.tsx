/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import styles from './ItemSearched.module.scss';


export default function ItemSearched(){
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="https://poltronanerd.com.br/wp-content/uploads/2019/11/vikings-1.jpg" alt="Vikings" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.row}>
          <h3 className={styles.title}>Vikings</h3>
          <Link href="/info/0">
          <a className={styles.link}>
            Ver mais
          </a>
        </Link>
        </div>
        <p className={styles.textInfo}>
            Vikings é uma série muito top ...
          </p>

        
      </div>
    </div>
  );
}