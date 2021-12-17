import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de séries</title>
        <meta
          name="description"
          content="App para listagem de séries que já assisti"
        />
      </Head>
      <main className={styles.main} />
    </div>
  );
};

