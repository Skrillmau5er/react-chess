import piece from './piece';
export default class bishop extends piece {
  getPath(ID, board) {
    let path = [];
    let pieceEncountered = false;

    //Get path left up
    let nextPiece = ID - 9;
    while (
      nextPiece >= 0 &&
      nextPiece % 8 !== 7 &&
      (board[nextPiece] === null || !pieceEncountered)
    ) {
      if (board[nextPiece] === null) {
        path.push(nextPiece);
        nextPiece -= 9;
      } else if (board[nextPiece].getPlayer() === board[ID].getPlayer()) {
        pieceEncountered = true;
      } else {
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    //Get path right up
    nextPiece = ID - 7;
    pieceEncountered = false;
    while (
      nextPiece >= 0 &&
      nextPiece % 8 !== 0 &&
      (board[nextPiece] === null || !pieceEncountered)
    ) {
      if (board[nextPiece] === null) {
        path.push(nextPiece);
        nextPiece -= 7;
      } else if (board[nextPiece].getPlayer() === board[ID].getPlayer()) {
        pieceEncountered = true;
      } else {
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    //Get path left down
    nextPiece = ID + 7;
    pieceEncountered = false;
    while (
      nextPiece < 64 &&
      nextPiece % 8 !== 7 &&
      (board[nextPiece] === null || !pieceEncountered)
    ) {
      if (board[nextPiece] === null) {
        path.push(nextPiece);
        nextPiece += 7;
      } else if (board[nextPiece].getPlayer() === board[ID].getPlayer()) {
        pieceEncountered = true;
      } else {
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    //Get path right down
    nextPiece = ID + 9;
    pieceEncountered = false;
    while (
      nextPiece < 64 &&
      nextPiece % 8 !== 0 &&
      (board[nextPiece] === null || !pieceEncountered)
    ) {
      if (board[nextPiece] === null) {
        path.push(nextPiece);
        nextPiece += 9;
      } else if (board[nextPiece].getPlayer() === board[ID].getPlayer()) {
        pieceEncountered = true;
      } else {
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    return path;
  }
}
