import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import styles from './Info.module.scss';

export default function Info() {
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
            src="https://i2.wp.com/3.bp.blogspot.com/-N7kMwSGyAVI/WWeZXMU1qjI/AAAAAAAANnk/HYZ3m3uRG4YhW4pu8iOOQtvbDh1BzymQQCLcBGAs/s1600/Vikings.jpg?ssl=1"
            alt=""
          />
        </div>
        <img
          className={styles.img}
          src="https://i2.wp.com/3.bp.blogspot.com/-N7kMwSGyAVI/WWeZXMU1qjI/AAAAAAAANnk/HYZ3m3uRG4YhW4pu8iOOQtvbDh1BzymQQCLcBGAs/s1600/Vikings.jpg?ssl=1"
          alt=""
        />
      </header>
      <div className={styles.content}>
        <h1 className={styles.title}>Vikings</h1>
        <span className={styles.seasons}>Temporadas: 8</span>
        <span className={styles.seasons}>Status: Assistido</span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          rediving essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <Button onClick={() => setShowModal(true)} title="Salvar na minha lista" />
      </div>
      { showModal && <Modal id={0} title='Vikings' close={() => setShowModal(false)}/>}
    </main>
  );
}
