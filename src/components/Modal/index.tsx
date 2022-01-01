import React, { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import Switch from '@mui/material/Switch';
import Button from '../Button';
import { SerieInfo } from '../../pages/info/[id]';
import styles from './Modal.module.scss';

interface ModalProps extends SerieInfo {
  close: () => void;
}

export default function Modal({ id, name, hasInMyList, close }: ModalProps) {
  const [watch, setWatch] = useState(false);
  const [myList, setMyList] = useState(hasInMyList);

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
            checked={watch}
            onClick={() => {
              setWatch(!watch);
              setMyList(false);
            }}
          />
        </div>
        <div className={styles.row}>
          <span>Irei assistir</span>
          <Switch
            color="success"
            checked={myList}
            onClick={() => {
              setMyList(!myList);
              setWatch(false);
            }}
          />
        </div>
        <Button onClick={() => console.log(id)} title="Confirmar" />
      </div>
    </div>
  );
}
