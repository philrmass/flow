import { useEffect, useState } from 'preact/hooks';
// import { useLocalStorage } from 'utilities/hooks';
import Controls from './Controls';
import Display from './Display';
import { version } from '../../package.json';
import styles from './Home.module.css';

const SIZE = 10;
const AIR = 0;

export default function Home() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const values = new Array(SIZE * SIZE);

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const i = (y * SIZE) + x;
        values[i] = { type: AIR };
      }
    }

    setBoard(values);
  }, []);

  const handleTouch = (x, y) => {
    console.log('touch', x, y);
  };

  return (
    <div className={styles.main}>
      <Display
        board={board}
        size={SIZE}
        onTouch={handleTouch}
      />
      <Controls />
      <div className={styles.version}>
        { `v${version}` }
      </div>
    </div>
  );
}
