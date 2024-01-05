import { useState, useEffect, useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/header';
import Board from '@/components/board';
import Controller from '@/components/controller';
import GameStatusButton from '@/components/gameStatusButton';
import styles from '@/styles/index.module.css';
import { Coordinates, Direction, Grid, GameStatus, OppositeDirection } from '@/types/types';
import { BOARD_SIZE_X, BOARD_SIZE_Y, SNAKE_START_X, SNAKE_START_Y, GAME_SPEED } from '@/constant';
import { isDuplicateCoordinates, createNewCoordinates } from '@/coordinates';

const SNAKE_START_COORDINATES: Coordinates[] = [{ x: SNAKE_START_X, y: SNAKE_START_Y }];
const BOARD: Grid[][] = Array.from(new Array(BOARD_SIZE_Y), () => new Array(BOARD_SIZE_X).fill(Grid.BLANK));

const Home: NextPage = () => {
  const [snake, setSnake] = useState<Coordinates[]>(SNAKE_START_COORDINATES);
  const [direction, setDirection] = useState<Direction>(Direction.DOWN);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.SUSPEND);
  const [food, setFood] = useState<Coordinates>();
  useEffect(() => {
    setFood({ ...createNewCoordinates(SNAKE_START_COORDINATES) });
  }, []);

  const setNewDirection = useCallback(
    (nextDirection: Direction) => {
      const nowGameState = gameStatus;
      if (nowGameState !== GameStatus.PLAYING) {
        return;
      }
      const prevDirection = direction;
      if (nextDirection === prevDirection) {
        return;
      }
      const nowSnake = snake;
      if (OppositeDirection[prevDirection] === nextDirection && nowSnake.length >= 2) {
        return;
      }
      setDirection(nextDirection);
    },
    [direction, gameStatus, snake],
  );

  const setNewGameStatus = useCallback(() => {
    const nowGameStatus = gameStatus;
    switch (nowGameStatus) {
      case GameStatus.SUSPEND:
        setGameStatus(GameStatus.PLAYING);
        break;
      case GameStatus.PLAYING:
        setGameStatus(GameStatus.SUSPEND);
        break;
      case GameStatus.OVER:
      case GameStatus.CLEAR:
        window.location.reload();
    }
  }, [gameStatus]);

  const moveSnake = useCallback(() => {
    if (gameStatus !== GameStatus.PLAYING || food === undefined) return;
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
        setGameStatus(GameStatus.CLEAR);
        return;
      }
      const newFood = createNewCoordinates(newSnake);
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
      setGameStatus(GameStatus.OVER);
      return;
    } else {
      setSnake(newSnake);
    }
  }, [snake, food, direction, gameStatus]);

  useEffect(() => {
    const intervalId = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(intervalId);
  }, [moveSnake]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setNewGameStatus();
        return;
      }
      switch (event.key) {
        case 'ArrowUp':
          setNewDirection(Direction.UP);
          break;
        case 'ArrowDown':
          setNewDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
          setNewDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
          setNewDirection(Direction.RIGHT);
          break;
        default:
          break;
      }
    },
    [setNewDirection, setNewGameStatus],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const board = useMemo((): Grid[][] => {
    const newBoard = JSON.parse(JSON.stringify(BOARD));
    newBoard[snake[0].y][snake[0].x] = Grid.SNAKEHEAD;
    snake.slice(1).forEach((condinate) => {
      newBoard[condinate.y][condinate.x] = Grid.SNAKEBODY;
    });
    if (food !== undefined) newBoard[food.y][food.x] = Grid.FOOD;
    return newBoard;
  }, [snake, food]);

  return (
    <>
      <Head>
        <title>Snake-game</title>
      </Head>
      <div className={styles.container}>
        <Header snakeLength={snake.length} />
        <Board board={board} />
        <Controller setNewDirection={setNewDirection.bind(this)} />
        <GameStatusButton gameStatus={gameStatus} setNewGameStatus={setNewGameStatus.bind(this)} />
      </div>
    </>
  );
};
export default Home;
