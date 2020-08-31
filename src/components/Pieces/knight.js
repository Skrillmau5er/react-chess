import piece from "./piece";
import { withInBoardLimits, getColumn } from "./helperFunctions";

export default class knight extends piece {
  constructor(name, player) {
    super(name, player);
    this.moveOptions = [6, 10, 15, 17, -6, -10, -15, -17];
    this.moveOptionsRight = [10, 17, -6, -15];
  }

  getPath = (ID, board) => {
    const path = [];
    this.moveOptions.forEach((pos) => {
      let moveToID = ID + pos;
      if (withInBoardLimits(moveToID)) {
        let moveToPiece = board[moveToID];
        if (this.moveIsPossible(ID, pos, moveToPiece)) {
          path.push(moveToID);
        }
      }
    });
    return path;
  }

  moveGoesOverEdge = (currentPos, movePos) => {
    if (this.moveOptionsRight.includes(movePos)) {
      if (getColumn(currentPos) < getColumn(currentPos + movePos)) {
        return false;
      }
    } else {
      if (getColumn(currentPos) > getColumn(currentPos + movePos)) {
        return false;
      }
    }
    return true;
  };

  moveIsPossible = (currentPos, movePos, moveToPiece) => {
    if (
      !this.moveGoesOverEdge(currentPos, movePos) &&
      (moveToPiece === null || moveToPiece.getPlayer() !== this.player)
    ) {
      return true;
    } else {
      return false;
    }
  };
}
