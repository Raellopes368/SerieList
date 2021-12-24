import React from 'react';
import { RiCloseFill } from 'react-icons/ri';
import Switch from '@mui/material/Switch';
import Button from '../Button';
import styles from './Modal.module.scss';

type ModalProps = {
  id: number;
  title: string;
  close: () => void;
};

export default function Modal({ id, title, close }: ModalProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button type="button" className={styles.close} onClick={close}>
          <RiCloseFill size={35} color="#db3e32" />
        </button>
        <h2>{title}</h2>
        <div className={styles.row}>
          <span>Já assisti</span>
          <Switch color='success'/>
        </div>
        <div className={styles.row}>
          <span>Irei assistir</span>
          <Switch color='success'/>
        </div>
        <Button onClick={() => console.log(id)} title='Confirmar'/>
      </div>
    </div>
  );
}
