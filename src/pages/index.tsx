import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import Header from '../components/Header';
import Main from '../components/Main';
import StoryList from '../components/StoryList';
import api from '../services/api';
import { cookieName } from '../hooks/AuthContext';
import styles from '../../styles/Home.module.css';
import { database } from '../services/firebase';


type TSerieStory = {
  id: number;
  image: string;
  name: string;
};


type TSerieItem = {
  id: string;
  serieId: number;
  name: string;
  image: string;
  watched: boolean;
}

type TSerieResults = {
  results: TSerieStory[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [cookieName]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const querySnapshot = await getDocs(collection(database, 'series'));
  const series: TSerieItem[] = [];

  querySnapshot.forEach(result => {
    const data = result.data() as TSerieItem;
    series.push({
      ...data,
      id: result.id,
    });
  });


  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const { data } = await api.get<TSerieResults>(
      `/tv/popular?api_key=${apiKey}&language=pt-BR&page=1`
    );
    const stories = data.results;
    return {
      props: {
        stories,
        series,
      },
    };
  } catch (error) {
    //
  }

  return {
    props: {
      stories: [],
      series: [],
    },
  };
};

export default function Home({
  stories, series
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(series);

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
        <StoryList series={stories} />
        <Main />
      </main>
    </div>
  );
}
