/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import StoryItem from '../StoryItem';
import styles from './StoryList.module.scss';

let isDown = false;
let startX = 0;
let scrollLeft = 0;

export type TSerieStory = {
  id: number;
  backdrop_path: string;
  name: string;
};

type StoryListProps = {
  series: TSerieStory[];
};

export default function StoryList({ series }: StoryListProps) {
  const slider = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(false);
  function handleMouseDown(e: MouseEvent) {
    isDown = true;
    startX = e.pageX - (slider.current?.offsetLeft || 0);
    scrollLeft = slider.current?.scrollLeft || 0;
  }

  function handleMouseLeave() {
    isDown = false;
  }

  function handleMouseUp() {
    isDown = false;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDown) return;
    e.preventDefault();
    const offsetLeft = slider.current?.offsetLeft || 0;
    const x = e.pageX - offsetLeft;
    const walk = (x - startX) * 1.1;
    if (slider.current) {
      slider.current.scrollLeft = scrollLeft - walk;
    }
  }
  useEffect(() => {
    try {
      slider.current?.addEventListener('mousedown', handleMouseDown);
      slider.current?.addEventListener('mouseleave', handleMouseLeave);
      slider.current?.addEventListener('mouseup', handleMouseUp);
      slider.current?.addEventListener('mousemove', handleMouseMove);
    } catch (error) {
      //
    }

    return () => {
      slider.current?.removeEventListener('mousedown', handleMouseDown);
      slider.current?.removeEventListener('mouseleave', handleMouseLeave);
      slider.current?.removeEventListener('mouseup', handleMouseUp);
      slider.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.itemsWrapper}>
      <ul
        className={`${styles.items} ${active && styles.active}`}
        onMouseDown={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onMouseUp={() => setActive(false)}
        ref={slider}
      >
        {series.map((serie) => (
          <StoryItem
            key={serie.id}
            id={serie.id}
            name={serie.name}
            backdrop_path={serie.backdrop_path}
          />
        ))}
      </ul>
    </div>
  );
}
