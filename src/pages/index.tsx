import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Header from '../components/Header';
import Main from '../components/Main';
import StoryList from '../components/StoryList';

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
      <main className={styles.main}>
        <Header />
        <StoryList />
        <Main />
      </main>
    </div>
  );
};

