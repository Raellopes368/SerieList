import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import styles from './Info.module.scss';
import api from '../../services/api';
import { cookieName, UseAuthContext } from '../../hooks/AuthContext';
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

export interface SerieInfo extends TSerieItem {
  watched: boolean;
  hasInMyList?: boolean;
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
      where('serieId', '==', Number(id))
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
            hasInMyList: !!serieData[0],
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
  const { user } = UseAuthContext();
  const [serieInfoState, setSerieInfoState] = useState(serieInfo);

  async function handleSaveInformations(info: SerieInfo) {
    const data = {
      description: serieInfo.description,
      episodes: serieInfo.episodes,
      seasons: serieInfo.seasons,
      ...info,
    };

    try {
      const seriesRef = collection(database, 'series');

      await setDoc(doc(seriesRef), {
        ...data,
        userId: user?.id,
        createdAt: serverTimestamp(),
      });
      setSerieInfoState(data);
    } catch (error) {
      console.log(error);
    }
    
  }
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
            src={serieInfoState.image}
            alt={serieInfoState.name}
          />
        </div>
        <img
          className={styles.img}
          src={serieInfoState.image}
          alt={serieInfoState.name}
        />
      </header>
      <div className={styles.content}>
        <h1 className={styles.title}>{serieInfoState.name}</h1>
        <span className={styles.seasons}>
          Temporadas: {serieInfoState.seasons}
        </span>
        <span className={styles.seasons}>
          Episódios: {serieInfoState.episodes}
        </span>
        <span className={styles.seasons}>
          Status:{' '}
          {serieInfoState.hasInMyList
            ? serieInfoState.watched
              ? 'Assistido'
              : 'Quero assistir'
            : 'Não está na minha lista'}
        </span>
        <p>{serieInfoState.description}</p>

        {!serieInfoState.watched && (
          <Button
            onClick={() => setShowModal(true)}
            title="Salvar na minha lista"
          />
        )}
      </div>
      {showModal && (
        <Modal
          {...serieInfoState}
          handleSave={handleSaveInformations}
          close={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
