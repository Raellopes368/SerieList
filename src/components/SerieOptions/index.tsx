import React from 'react';
import { BsEye, BsTrash } from 'react-icons/bs';
import { useSerieContext } from '../../hooks/SerieListContext';
import { TSerieItem } from '../../pages';
import styles from './SerieOptions.module.scss';

interface SerieOptionsProps extends TSerieItem {
  setSeeOptions: (option: boolean) => void;
};

export default function SerieOptions({
  setSeeOptions,
  watched,
  id,
}: SerieOptionsProps) {
  const { watchSerie, removeSerie } = useSerieContext()

  return (
    <div className={styles.optionsContainer}>
      <button type="button" onClick={() => removeSerie(id)}>
        Remover da minha lista <BsTrash color="#fff" size={15} />
      </button>
      {!watched && (
        <button type="button" onClick={() => watchSerie(id)}>
          Já assisti <BsEye color="#fff" size={15} />
        </button>
      )}

      <button type="button" onClick={() => setSeeOptions(false)}>
        Cancelar
      </button>
    </div>
  );
}
