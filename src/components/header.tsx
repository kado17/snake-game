import { Component } from 'react';
import styles from '@/styles/index.module.css';

class Header extends Component<{ snakeLength: number }> {
  render() {
    const { snakeLength } = this.props;

    return (
      <div className={styles.row}>
        <div className={styles.header}>SNAKE-GAME</div>
        <div className={styles.header}>SCORE: {String(snakeLength).padStart(3, '0')}</div>
      </div>
    );
  }
}

export default Header;
