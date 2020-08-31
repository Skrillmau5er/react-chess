const BOARD_MIN = 0;
const BOARD_MAX = 63;

export const getRow = (pos) => {
  return Math.floor(pos / 8) + 1;
};

export const getColumn = (pos) => {
  return (pos % 8) + 1;
};

export const withInBoardLimits = (pos) => {
  return pos >= BOARD_MIN && pos <= BOARD_MAX;
};

export const getDiagonalPath = (curPos, board, player) => {
  let path = [];
  let moveOptions = [7, 9, -7, -9];

  moveOptions.forEach((moveAmt) => {
    let pieceEncountered = false;
    let nextPos = curPos + moveAmt;
    let columnEdge = moveAmt === -9 || moveAmt === 7 ? 8 : 1;

    while (
      diagonalMovePossible(
        nextPos,
        board[nextPos],
        columnEdge,
        pieceEncountered
      )
    ) {
      if (board[nextPos] === null) {
        path.push(nextPos);
        nextPos += moveAmt;
      } else if (board[nextPos].getPlayer() === player) {
        pieceEncountered = true;
      } else {
        pieceEncountered = true;
        path.push(nextPos);
      }
    }
  });

  return path;
};

const diagonalMovePossible = (
  nextPos,
  nextPiece,
  columnEdge,
  pieceEncountered
) => {
  return (
    withInBoardLimits(nextPos) &&
    getColumn(nextPos) !== columnEdge &&
    (nextPiece === null || !pieceEncountered)
  );
};

export const getLinearPath = (curPos, board, player) => {
  let path = [];
  let moveOptions = [8, -8, 1, -1];

  moveOptions.forEach((moveAmt) => {
    let nextPos = curPos + moveAmt;
    let pieceEncountered = false;
    let columnEdge = moveAmt === 1 ? 1 : 8;
    let excludeEdgeCase = moveAmt === 8 || moveAmt === -8;

    while (
      linearMovePossible(
        nextPos,
        board[nextPos],
        columnEdge,
        pieceEncountered,
        excludeEdgeCase
      )
    ) {
      if (board[nextPos] === null) {
        path.push(nextPos);
        nextPos += moveAmt;
      } else if (board[nextPos].getPlayer() === player) {
        pieceEncountered = true;
      } else {
        pieceEncountered = true;
        path.push(nextPos);
      }
    }
  });
  return path;
};

const linearMovePossible = (
  nextPos,
  nextPiece,
  columnEdge,
  pieceEncountered,
  excludeEdgeCase
) => {
  return (
    withInBoardLimits(nextPos) &&
    (getColumn(nextPos) !== columnEdge || excludeEdgeCase) &&
    (nextPiece === null || !pieceEncountered)
  );
};
