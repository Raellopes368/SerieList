import Link from 'next/link';
import React from 'react';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import ItemSearched from '../../components/ItemSearched';
import styles from './Search.module.scss';

export default function Search() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <FiArrowLeft className={styles.goBack} color="#C70039" size={45} />
        </Link>
        <div className={styles.searchContainer}>
          <input type="text" className={styles.searchInput} />
          <FiSearch color="#C70039" size={35} />
        </div>
      </header>
      <main className={styles.content}>
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
        <ItemSearched />
      </main>
    </main>
  );
}
