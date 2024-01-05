import { Component } from 'react';
import classnames from 'classnames';
import styles from '@/styles/index.module.css';
import { GameStatus } from '@/types/types';

const ButtonMessage = {
  PLAYING: 'STOP',
  SUSPEND: 'START',
  CLEAR: 'GAMECLEAR',
  OVER: 'GAMEOVER',
};

class GameStatusButton extends Component<{
  gameStatus: GameStatus;
  setNewGameStatus: (gameStatus: GameStatus) => void;
}> {
  render() {
    const { gameStatus, setNewGameStatus } = this.props;
    return (
      <div
        className={classnames({
          [styles.btn]: true,
          [styles.btn__gamestatus]: true,
          [styles.btn__playing]: gameStatus === GameStatus.SUSPEND,
          [styles.btn__stop]: gameStatus === GameStatus.PLAYING,
          [styles.btn__clear]: gameStatus === GameStatus.CLEAR,
          [styles.btn__over]: gameStatus === GameStatus.OVER,
        })}
        onClick={() => setNewGameStatus(gameStatus)}
      >
        {ButtonMessage[gameStatus]}
      </div>
    );
  }
}
export default GameStatusButton;
