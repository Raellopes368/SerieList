import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import Switch from '@mui/material/Switch';
import Button from '../Button';
import { SerieInfo } from '../../pages/info/[id]';
import styles from './Modal.module.scss';

interface ModalProps extends SerieInfo {
  close: () => void;
  handleSave: (serieInfo: SerieInfo) => Promise<void>;
}

export default function Modal({
  id,
  image,
  name,
  hasInMyList,
  close,
  handleSave,
}: ModalProps) {
  const [watched, setWatched] = useState(false);
  const [myList, setMyList] = useState(hasInMyList);

  async function handleSaveSerieInfo() {
    await handleSave({
      id,
      image,
      name,
      serieId: Number(id),
      watched,
      hasInMyList: watched || myList
    });
    close();
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button type="button" className={styles.close} onClick={close}>
          <RiCloseFill size={35} color="#db3e32" />
        </button>
        <h2>{name}</h2>
        <div className={styles.row}>
          <span>Já assisti</span>
          <Switch
            color="success"
            checked={watched}
            onClick={() => {
              setWatched(!watched);
              setMyList(false);
            }}
          />
        </div>
        <div className={styles.row}>
          <span>Quero assistir</span>
          <Switch
            color="success"
            checked={myList}
            onClick={() => {
              setMyList(!myList);
              setWatched(false);
            }}
          />
        </div>
        <Button onClick={handleSaveSerieInfo} title="Confirmar" />
      </div>
    </div>
  );
}
