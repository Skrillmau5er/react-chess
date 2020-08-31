import piece from "./piece";
import { withInBoardLimits } from "./helperFunctions";

export default class king extends piece {
  constructor(name, player) {
    super(name, player);
    this.moveOptions = [1, 7, 8, 9, -1, -7, -8, -9];
    this.moveOptionsCastling = [-3, 4];
    this.rookCastleMoveMap = [
      { king: 61, rook: [63,60] },
      { king: 5, rook: [7,4] },
      { king: 1, rook: [0,2] },
      { king: 57, rook: [56,58] },
    ];
    this.firstMove = true;
  }

  isFirstMove = () => {
    return this.firstMove;
  };

  firstMoveOver = () => {
    this.firstMove = false;
  };

  getPath = (ID, board) => {
    const path = [];

    this.moveOptions.forEach((pos) => {
      if (withInBoardLimits(ID + pos) && this.moveIsPossible(board[ID + pos])) {
        path.push(ID + pos);
      }
    });

    const castlePath = this.getCastlePath(board, ID);
    return path.concat(castlePath);
  };

  getCastlePath = (board, ID) => {
    let castlePath = [];
    this.moveOptionsCastling.forEach((pos) => {
      const rookPos = ID + pos;
      if (
        board[rookPos] &&
        board[ID + pos].getName() === "rook" &&
        board[rookPos].getPlayer() === this.player &&
        this.isEmptyBetweenKingAndRook(ID, pos, board) &&
        board[rookPos].isFirstMove() &&
        this.firstMove
      ) {
        castlePath.push(ID + (pos === 4 ? 2 : -2));
      }
    });

    return castlePath;
  };

  getRookCastleSpot = (moveToID) => {
    let rookMove;
    this.rookCastleMoveMap.forEach(move => {
      if(move.king === moveToID) {
        rookMove = move.rook;
      }
    });
    return rookMove;
  };

  isEmptyBetweenKingAndRook = (kingPos, moveAmt, board) => {
    if (moveAmt < 0) {
      for (let x = kingPos - 1; x > kingPos + moveAmt; x--) {
        if (board[x] !== null) {
          return false;
        }
      }
    } else {
      for (let x = kingPos + 1; x < kingPos + moveAmt; x++) {
        if (board[x] !== null) {
          return false;
        }
      }
    }
    return true;
  };

  moveIsPossible = (moveToPiece) => {
    if (moveToPiece === null || moveToPiece.getPlayer() !== this.player) {
      return true;
    }
  };
}
