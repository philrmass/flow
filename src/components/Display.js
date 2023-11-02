import { useEffect, useState } from 'preact/hooks';
import { getTouches, getPositions } from 'utilities/touch';
import { getBoardPos, isOnBoard, draw } from '../utilities/draw';
import styles from './Display.module.css';

export default function Display({
  board,
  size,
  onTouch,
}) {
  const [canvas, setCanvas] = useState(null);
  const [needsResize, setNeedsResize] = useState(false);
  const [offset, setOffset] = useState(0);
  const [scale, setScale] = useState(1);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const updateResize = () => setNeedsResize(true);

    window.addEventListener('resize', updateResize);
    return () => window.removeEventListener('resize', updateResize);
  }, []);

  useEffect(() => {
    if (canvas && size) {
      const scl = Math.floor(canvas.width / size);
      const off = Math.floor((canvas.width - scl * size) / 2);
      const data = new ImageData(canvas.width, canvas.height);

      setScale(scl);
      setOffset(off);
      setImageData(data);
      setNeedsResize(false);
    }
  }, [canvas, size, needsResize]);

  useEffect(() => {
    if (canvas && board && imageData) {
      draw(board, size, canvas, imageData, offset, scale);
    }
  }, [board, size, canvas, imageData, offset, scale]);

  const handleTouch = (e) => {
    const { x, y } = getPositions(getTouches(e));
    const { boardX, boardY } = getBoardPos(x, y, offset, scale);
    if (isOnBoard(boardX, boardY, size)) {
      onTouch(boardX, boardY);
    }
  };

  const handleMove = (e) => {
    e.preventDefault();
    handleTouch(e);
  };

  const initCanvas = (elem) => {
    if (elem) {
      elem.width = elem.clientWidth;
      elem.height = elem.clientHeight;
      setCanvas(elem);
    }
  };

  return (
    <div
      className={styles.main}
      onTouchStart={handleTouch}
      onTouchMove={handleMove}
    >
      <canvas ref={initCanvas} />
    </div>
  );
}
