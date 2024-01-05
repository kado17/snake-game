import { Component } from 'react';
import classnames from 'classnames';
import styles from '@/styles/index.module.css';
import { Grid } from '@/types/types';

class Board extends Component<{ board: Grid[][] }> {
  render() {
    const { board } = this.props;
    return (
      <div className={styles.board}>
        {board.map((row: Grid[], y: number) => (
          <div key={`${y}`} className={styles.board__row}>
            {row.map((item: Grid, x: number) => (
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
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
export default Board;
