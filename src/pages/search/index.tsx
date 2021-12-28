import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import ItemSearched from '../../components/ItemSearched';
import styles from './Search.module.scss';
import api from '../../services/api';

let time: NodeJS.Timeout | null = null;

export type SerieResponse = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
};

export type SerieInformation = {
  id: number;
  image: string;
  name: string;
  description: string;
};

type TApiResponse = {
  results: SerieResponse[];
};
export default function Search() {
  const [serieName, setSerieName] = useState('');
  const [serieList, setSerieList] = useState<SerieInformation[]>([]);

  async function searchSerieByName() {
    try {
      if (serieName.trim().length) {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const { data } = await api.get<TApiResponse>(
          `/search/tv?api_key=${apiKey}&language=pt-BR&page=1&query=${serieName}`
        );

        const baseUrlImage = 'https://image.tmdb.org/t/p/w500';

        const allSeriesFormateds = data.results
          .map((result) => ({
            id: result.id,
            name: result.name,
            description: result.overview,
            image: result.backdrop_path
              ? `${baseUrlImage}${result.backdrop_path}`
              : `${baseUrlImage}${result.poster_path}`,
          }))
          .filter((serie) => serie.description);

        setSerieList(allSeriesFormateds);
      } else setSerieList([]);
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    if (time) clearTimeout(time);
    time = setTimeout(searchSerieByName, 1000);
  }, [serieName]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <FiArrowLeft className={styles.goBack} color="#C70039" size={45} />
        </Link>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Nome da série"
            className={styles.searchInput}
            value={serieName}
            onChange={(e) => setSerieName(e.target.value)}
          />
          <FiSearch color="#C70039" size={35} />
        </div>
      </header>
      <main className={styles.content}>
        {serieList.map((serie) => (
          <ItemSearched key={serie.id} {...serie} />
        ))}
        {!serieList.length && (
          <div className={styles.empty}>
            <span>Busque suas séries</span>
          </div>
        )}
      </main>
    </main>
  );
}
