import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/index.module.css';
import { eventNames } from 'process';

type Coordinate = {
  x: number;
  y: number;
};

const BOARD_SIZE_X = 20;
const BOARD_SIZE_Y = 20;
const board: number[][] = Array.from(new Array(BOARD_SIZE_Y), (_) => new Array(BOARD_SIZE_X).fill(0));
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) => (
          <div key={`${y}`} className={styles.row}>
            {row.map((_, x) => (
              <div
                key={`${x}-${y}`}
                className={[styles.grid, (x + y) % 2 == 0 ? styles.grid__even : styles.grid__odd].join(' ')}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
