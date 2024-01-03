import styles from '@/styles/index.module.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import classnames from 'classnames';

type Coordinates = {
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
  SNAKEHEAD: 'SNAKEHEAD',
  SNAKEBODY: 'SNAKEBODY',
  FOOD: 'FOOD',
} as const;
type Grid = (typeof Grid)[keyof typeof Grid];

const BOARD_SIZE_X = 20;
const BOARD_SIZE_Y = 20;
const SNAKE_START_COORDINATES: Coordinates[] = [{ x: 1, y: 1 }];
const BOARD: Grid[][] = Array.from(new Array(BOARD_SIZE_Y), (_) => new Array(BOARD_SIZE_X).fill(Grid.BLANK));

const randomCoordinates = (x_max: number, y_max: number): Coordinates => {
  return { x: Math.floor(Math.random() * x_max), y: Math.floor(Math.random() * y_max) };
};

const isDuplicateCoordinates = (checkCoordinates: Coordinates, segments: Coordinates[]) => {
  return segments.some((segment) => segment.x === checkCoordinates.x && segment.y === checkCoordinates.y);
};

const createNewFood = (snake: Coordinates[]) => {
  let newFood;
  do {
    newFood = randomCoordinates(BOARD_SIZE_X, BOARD_SIZE_Y);
  } while (isDuplicateCoordinates(newFood, snake));
  return newFood;
};

const Home: NextPage<Props> = () => {
  const [snake, setSnake] = useState<Coordinates[]>(SNAKE_START_COORDINATES);
  const [direction, setDirection] = useState<Direction>(Direction.DOWN);
  const [isGameover, setIsGameover] = useState(false);
  const [food, setFood] = useState<Coordinate>();
  useEffect(() => {
    setFood({ ...createNewFood(SNAKE_START_COORDINATES) });
  }, []);

  const moveSnake = useCallback(() => {
    if (isGameover) return;
    const newSnake = JSON.parse(JSON.stringify(snake));
    const head = { ...newSnake[0] };

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
        return;
    }
    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      if (newSnake.length >= BOARD_SIZE_X * BOARD_SIZE_Y) {
        console.log('GAMECLEAR');
        return;
      }
      const newFood = createNewFood(snake);
      setFood(newFood);
    } else {
      newSnake.pop();
    }
    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE_X ||
      head.y < 0 ||
      head.y >= BOARD_SIZE_Y ||
      isDuplicateCoordinates(head, newSnake.slice(1))
    ) {
      setIsGameover(true);
      console.log('GAMEOVER');
    } else {
      setSnake(newSnake);
    }
  }, [snake, food, direction, isGameover]);

  useEffect(() => {
    const intervalId = setInterval(moveSnake, 150);

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
    newBoard[snake[0].y][snake[0].x] = Grid.SNAKEHEAD;
    snake.slice(1).forEach((condinate) => {
      newBoard[condinate.y][condinate.x] = Grid.SNAKEBODY;
    });
    if (food !== undefined) newBoard[food.y][food.x] = Grid.FOOD;
    return newBoard;
  }, [snake, food]);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) => (
          <div key={`${y}`} className={styles.row}>
            {row.map((item, x) => (
              <div
                key={`${x}-${y}`}
                className={classnames({
                  [styles.grid]: true,
                  [styles.grid__even]: (x + y) % 2 === 0,
                  [styles.grid__odd]: (x + y) % 2 !== 0,
                  [styles.grid__snake__head]: item === Grid.SNAKEHEAD,
                  [styles.grid__snake__body]: item === Grid.SNAKEBODY,
                  [styles.grid__food]: item === Grid.FOOD,
                })}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.controller}>
        <div className={styles.column}>
          <div className={classnames(styles.btn, styles.btn__side)} onClick={() => setDirection(Direction.LEFT)}>
            ←
          </div>
        </div>
        <div className={styles.column}>
          <div className={classnames(styles.btn, styles.btn__center)} onClick={() => setDirection(Direction.UP)}>
            ↑
          </div>
          <div className={classnames(styles.btn, styles.btn__center)} onClick={() => setDirection(Direction.DOWN)}>
            ↓
          </div>
        </div>
        <div className={styles.column}>
          <div className={classnames(styles.btn, styles.btn__side)} onClick={() => setDirection(Direction.RIGHT)}>
            →
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
