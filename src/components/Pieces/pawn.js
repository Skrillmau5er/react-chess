import piece from "./piece";
import { getColumn, withInBoardLimits } from "./helperFunctions";

export default class pawn extends piece {
  constructor(name, player) {
    super(name, player);
    this.firstMove = true;
    this.attackOptions = [7,9];
    this.moveOptions = [8];
    this.firstMoveOptions = [16];
  }

  isFirstMove = () => {
    return this.firstMove;
  }

  getPath = (ID, board) => {
    let path = [];
    if (this.player === 1) {
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
