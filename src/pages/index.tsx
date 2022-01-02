import React, { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import Header from '../components/Header';
import SerieListItem from '../components/SerieListItem';
import StoryList from '../components/StoryList';
import api from '../services/api';
import { cookieName } from '../hooks/AuthContext';
import styles from '../../styles/Home.module.css';
import { database } from '../services/firebase';
import { decriptToken } from '../utils/decriptToken';
import { useSerieContext } from '../hooks/SerieListContext';

type TSerieStory = {
  id: number;
  image: string;
  name: string;
};

export type TSerieItem = {
  id: string;
  serieId: number;
  name: string;
  image: string;
  watched: boolean;
  createdAt?: Date;
};

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
    };
  }

  const tokenData: { user_id: string } = decriptToken(token);

  const firebaseQuery = query(
    collection(database, 'series'),
    where('userId', '==', tokenData.user_id),
    orderBy('createdAt', 'asc')
  );

  const querySnapshot = await getDocs(firebaseQuery);
  const series: TSerieItem[] = [];

  querySnapshot.forEach((result) => {
    const data = result.data() as TSerieItem;
    delete data.createdAt;
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
      series,
    },
  };
};

export default function Home({
  stories,
  series,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { watcheds, setWatcheds, myList, setMyList } = useSerieContext();

  useEffect(() => {
    const watchedsInFirebase: TSerieItem[] = series.filter((serie: TSerieItem) => serie.watched);
    const myListInFirebase: TSerieItem[] = series.filter((serie: TSerieItem) => !serie.watched);
  
    setWatcheds(watchedsInFirebase);
    setMyList(myListInFirebase);
  }, []);

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
        {!!watcheds.length && <SerieListItem series={watcheds} title='Assistidos'/>}
        {!!myList.length && <SerieListItem series={myList} title='Quero assistir'/>}
      </main>
    </div>
  );
}
