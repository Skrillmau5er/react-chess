import piece from './piece';

export default class pawn extends piece {
  constructor(name, player) {
    super(name, player);
    this.firstMove = true;
  }
  isFirstMove() {
    return this.firstMove;
  }

  getPath(ID, board) {
    let path = [];
    if (board[ID].getPlayer() === 1) {
      if (this.canAttack(board, ID + 7, ID, 'L')) path.push(ID + 7);
      if (this.canAttack(board, ID + 9, ID, 'R')) path.push(ID + 9);

      if (board[ID + 8] === null) {
        path.push(ID + 8);
        if (board[ID + 16] === null && this.firstMove) path.push(ID + 16);
      }
    } else {
      if (this.canAttack(board, ID - 7, ID, 'R')) path.push(ID - 7);
      if (this.canAttack(board, ID - 9, ID, 'L')) path.push(ID - 9);

      if (board[ID - 8] === null) {
        path.push(ID - 8);
        if (board[ID - 16] === null && this.firstMove) path.push(ID - 16);
      }
    }
    return path;
  }

  firstMoveOver() {
    this.firstMove = false;
  }

  canAttack(board, attackID, ID, direction) {
    let columnAttack;
    if (attackID >= 0 && attackID <= 63) {
      if (direction === 'L') {
        columnAttack = ID % 8 ? true : false;
      } else {
        columnAttack = ID % 8 === 7 ? false : true;
      }
      return (
        board[attackID] !== null &&
        board[attackID].getPlayer() !== board[ID].getPlayer() &&
        columnAttack
      );
    } else {
      return false;
    }
  }
}
