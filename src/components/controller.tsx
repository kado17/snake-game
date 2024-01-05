import { Component } from 'react';
import classnames from 'classnames';
import styles from '@/styles/index.module.css';
import { Direction } from '@/types/types';
class Controller extends Component<{ setNewDirection: (nextDirection: Direction) => void }> {
  render() {
    const { setNewDirection } = this.props;
    return (
      <div className={styles.controller}>
        <div className={styles.column}>
          <div className={classnames(styles.btn, styles.btn__side)} onClick={() => setNewDirection(Direction.LEFT)}>
            ←
          </div>
        </div>
        <div className={styles.column}>
          <div className={classnames(styles.btn, styles.btn__center)} onClick={() => setNewDirection(Direction.UP)}>
            ↑
          </div>
          <div className={classnames(styles.btn, styles.btn__center)} onClick={() => setNewDirection(Direction.DOWN)}>
            ↓
          </div>
        </div>
        <div className={styles.column}>
          <div className={classnames(styles.btn, styles.btn__side)} onClick={() => setNewDirection(Direction.RIGHT)}>
            →
          </div>
        </div>
        <div className={styles.column}></div>
      </div>
    );
  }
}
export default Controller;
