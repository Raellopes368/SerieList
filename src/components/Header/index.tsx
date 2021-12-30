/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import Link from 'next/link';
import { UseAuthContext } from '../../hooks/AuthContext';
import styles from './Header.module.scss';

export default function Header() {
  const { signOut } = UseAuthContext();
  const router = useRouter();

  function loggout() {
    signOut();
    router.push('/login');
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.signOut} onClick={loggout}>
        Sair <GoSignOut color="#fff" size={21} />
      </button>
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
