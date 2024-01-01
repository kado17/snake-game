import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/index.module.css';
import { useState, useEffect, useCallback, useMemo } from 'react';

type Coordinate = {
  x: number;
  y: number;
};
const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
} as const;
type Direction = (typeof Direction)[keyof typeof Direction];

const Grid = {
  BLANK: 'BLANK',
  SNAKE: 'SNAKE',
} as const;
type Grid = (typeof Grid)[keyof typeof Grid];

const BOARD_SIZE_X = 20;
const BOARD_SIZE_Y = 20;
const BOARD: Grid[][] = Array.from(new Array(BOARD_SIZE_Y), (_) => new Array(BOARD_SIZE_X).fill(Grid.BLANK));

const Home: NextPage = () => {
  const [snake, setSnake] = useState<Coordinate[]>([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState<Direction>(Direction.DOWN);
  const [isGameover, setIsGameover] = useState(false);
  const moveSnake = useCallback(() => {
    if (isGameover) return;
    const newSnake = [...snake];
    const head = newSnake[0];

    switch (direction) {
      case Direction.UP:
        head.y -= 1;
        break;
      case Direction.DOWN:
        head.y += 1;
        break;
      case Direction.LEFT:
        head.x -= 1;
        break;
      case Direction.RIGHT:
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);
    console.log(head.x, head.y);
    newSnake.pop();
    if (head.x < 0 || head.x >= BOARD_SIZE_X || head.y < 0 || head.y >= BOARD_SIZE_Y) {
      console.log('GAMEOVER');
      setIsGameover(true);
    } else {
      setSnake(newSnake);
    }
  }, [snake, direction, isGameover]);

  useEffect(() => {
    const intervalId = setInterval(moveSnake, 200);

    return () => clearInterval(intervalId);
  }, [moveSnake]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowUp':
        setDirection(Direction.UP);
        break;
      case 'ArrowDown':
        setDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
        setDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
        setDirection(Direction.RIGHT);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const board = useMemo(() => {
    const newBoard = JSON.parse(JSON.stringify(BOARD));
    snake.forEach((condinate) => {
      newBoard[condinate.y][condinate.x] = Grid.SNAKE;
    });
    return newBoard;
  }, [snake]);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) => (
          <div key={`${y}`} className={styles.row}>
            {row.map((item, x) => (
              <div
                key={`${x}-${y}`}
                className={[
                  styles.grid,
                  (x + y) % 2 == 0 ? styles.grid__even : styles.grid__odd,
                  item == Grid.SNAKE ? styles.grid__snake : '',
                ].join(' ')}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
