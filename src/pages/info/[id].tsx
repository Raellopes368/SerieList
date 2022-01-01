import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import styles from './Info.module.scss';
import api from '../../services/api';
import { cookieName } from '../../hooks/AuthContext';
import { database } from '../../services/firebase';
import { decriptToken } from '../../utils/decriptToken';
import { TSerieItem } from '..';

export type ApiResponse = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  number_of_episodes: number;
  number_of_seasons: number;
};

export interface SerieInfo extends TSerieItem{
  watched: boolean;
  hasInMyList: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { [cookieName]: token } = parseCookies(context);
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { params } = context;
  if (params?.id) {
    const { id } = params;
    const tokenData: { user_id: string } = decriptToken(token);

    const queryFirebase = query(
      collection(database, 'series'),
      where('userId', '==', tokenData.user_id),
      where('serieId', '==', id)
    );

    const serieData: TSerieItem[] = [];

    const querySnapshot = await getDocs(queryFirebase);
    querySnapshot.forEach((docResult) => {
      const data = docResult.data() as TSerieItem;
      serieData.push({
        ...data,
        id: docResult.id,
      });
    });

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const { data } = await api.get<ApiResponse>(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR&page=1`
      );

      const baseUrlImage = 'https://image.tmdb.org/t/p/w500';

      return {
        props: {
          serieInfo: {
            ...data,
            image: data.backdrop_path
              ? `${baseUrlImage}${data.backdrop_path}`
              : `${baseUrlImage}${data.poster_path}`,
            description: data.overview,
            episodes: data.number_of_episodes,
            seasons: data.number_of_seasons,
            watched: !!serieData[0]?.watched,
            hasInMyList: true,
          },
        },
      };
    } catch (error) {
      //
    }
  }

  return {
    props: {
      serieInfo: {},
    },
  };
};

export default function Info({
  serieInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button type="button" onClick={() => router.back()}>
          <FiArrowLeft className={styles.goBack} color="#f3235e" size={45} />
        </button>
        <div className={styles.imageContainer}>
          <img
            className={styles.imgHeader}
            src={serieInfo.image}
            alt={serieInfo.name}
          />
        </div>
        <img
          className={styles.img}
          src={serieInfo.image}
          alt={serieInfo.name}
        />
      </header>
      <div className={styles.content}>
        <h1 className={styles.title}>{serieInfo.name}</h1>
        <span className={styles.seasons}>Temporadas: {serieInfo.seasons}</span>
        <span className={styles.seasons}>Episódios: {serieInfo.episodes}</span>
        <span className={styles.seasons}>
          Status:{' '}
          {serieInfo.hasInMyList
            ? serieInfo.watched
              ? 'Assistido'
              : 'Quero assistir'
            : 'Não está na minha lista'}
        </span>
        <p>{serieInfo.description}</p>

        {!serieInfo.watched && (
          <Button
            onClick={() => setShowModal(true)}
            title="Salvar na minha lista"
          />
        )}
      </div>
      {showModal && (
        <Modal {...serieInfo} close={() => setShowModal(false)} />
      )}
    </main>
  );
}
