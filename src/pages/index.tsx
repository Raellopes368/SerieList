import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Header from '../components/Header';
import Main from '../components/Main';
import StoryList from '../components/StoryList';
import api from '../services/api';

type TSerieStory = {
  id: number;
  backdrop_path: string;
  name: string;
};

type TSerieResults = {
  results: TSerieStory[];
};

export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const { data } = await api.get<TSerieResults>(
      `/tv/popular?api_key=${apiKey}&language=pt-BR&page=1`
    );
    const series = data.results;
    return {
      props: {
        series,
      },
    };
  } catch (error) {
    return {
      props: {
        series: [],
      },
    };
  }
};


export default function Home({ series }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <StoryList series={series}/>
        <Main />
      </main>
    </div>
  );
}
