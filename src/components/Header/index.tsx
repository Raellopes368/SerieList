/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles.title}>Serie List</h1>
        <Link href="/search">
          <a className={styles.buttonSearch}>
            <FiSearch color="#C70039" size={46} />
          </a>
        </Link>
      </div>
    </div>
  );
}
