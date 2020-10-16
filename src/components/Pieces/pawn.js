import piece from "./piece";
import { getColumn, withInBoardLimits } from "./helperFunctions";

export default class pawn extends piece {
  attackOptions = [7,9];
  moveOptions = [8];
  firstMoveOptions = [16];
  constructor(player, firstMove) {
    super("pawn", player);
    this.firstMove = firstMove;
  }

  isFirstMove = () => {
    return this.firstMove;
  }

  getPath = (ID, board) => {
    let path = [];
    if (this.player === 0) {
      if (this.canAttack(board, ID + 7, ID, "L")) path.push(ID + 7);
      if (this.canAttack(board, ID + 9, ID, "R")) path.push(ID + 9);

      if (board[ID + 8] === null) {
        path.push(ID + 8);
        if (board[ID + 16] === null && this.firstMove) path.push(ID + 16);
      }
    } else {
      if (this.canAttack(board, ID - 7, ID, "R")) path.push(ID - 7);
      if (this.canAttack(board, ID - 9, ID, "L")) path.push(ID - 9);

      if (board[ID - 8] === null) {
        path.push(ID - 8);
        if (board[ID - 16] === null && this.firstMove) path.push(ID - 16);
      }
    }
    return path;
  };

  firstMoveOver = () => {
    this.firstMove = false;
  }

  canAttack = (board, attackID, ID, direction) => {
    let columnAttack;
    let enPassant = false;
    let attackIDHasOpponent = board[attackID] !== null && board[attackID].getPlayer() !== this.player;

    if (withInBoardLimits(attackID)) {
      let column = getColumn(ID);
      if (direction === "L") {
        columnAttack = column !== 1;
      } else {
        columnAttack = column !== 8;
      }
      return (attackIDHasOpponent && columnAttack) || enPassant;
    } else {
      return false;
    }
  }
}
