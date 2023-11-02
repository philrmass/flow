export function getBoardPos(x, y, offset, scale) {
  const boardX = Math.floor((x - offset) / scale);
  const boardY = Math.floor((y - offset) / scale);

  return { boardX, boardY };
}

export function isOnBoard(boardX, boardY, size) {
  return boardX >= 0 && boardX < size && boardY >= 0 && boardY < size;
}

function getType(board, size, x, y, offset, scale) {
  const { boardX, boardY } = getBoardPos(x, y, offset, scale);

  if (isOnBoard(boardX, boardY, size)) {
    const boardI = (size * boardY) + boardX;
    return board[boardI]?.type;
  }
}

function getColor(type) {
  switch (type) {
    case 0:
      return [200, 225, 255, 255];
    default:
      return [255, 255, 255, 255];
  }
}

export function draw(board, size, canvas, imageData, offset, scale) {
  const ctx = canvas.getContext('2d');

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = 4 * ((y * canvas.width) + x);
      const type = getType(board, size, x, y, offset, scale);
      const color = getColor(type);

      imageData.data[i + 0] = color[0];
      imageData.data[i + 1] = color[1];
      imageData.data[i + 2] = color[2];
      imageData.data[i + 3] = color[3];
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
