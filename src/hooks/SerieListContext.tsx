/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext, createContext } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { database } from '../services/firebase';
import { TSerieItem } from '../pages';

type SerieListContextProps = {
  watcheds: TSerieItem[];
  setWatcheds: (watcheds: TSerieItem[]) => void;
  myList: TSerieItem[];
  setMyList: (myList: TSerieItem[]) => void;
  watchSerie: (id: string) => Promise<void>
  removeSerie: (id: string) => Promise<void>
};

const SerieListContext = createContext({} as SerieListContextProps);

type SerieListProviderProps = {
  children: React.ReactNode;
};

export function SerieListProvider({ children }: SerieListProviderProps) {
  const [watcheds, setWatcheds] = useState<TSerieItem[]>([]);
  const [myList, setMyList] = useState<TSerieItem[]>([]);

  async function watchSerie(id: string) {
    await updateDoc(doc(database, 'series', id), {
      watched: true,
    })
    const toWatch = myList.find(item => item.id === id);
    setMyList(myList.filter(item => item.id !== id));
    if(toWatch) {
      setWatcheds([toWatch, ...watcheds]);
    }
  }

  async function removeSerie(id: string) {
    await deleteDoc(doc(database, 'series', id));
    setMyList(myList.filter(item => item.id !== id));
    setWatcheds(watcheds.filter(item => item.id !== id));
  }

  return (
    <SerieListContext.Provider
      value={{
        watcheds,
        setWatcheds,
        myList,
        setMyList,
        watchSerie,
        removeSerie,
      }}
    >
      {children}
    </SerieListContext.Provider>
  );
}

export function useSerieContext() {
  const context = useContext(SerieListContext);
  return context;
}