import piece from "./piece";
import { withInBoardLimits } from "./helperFunctions";

export default class king extends piece {
  moveOptions = [1, 7, 8, 9, -1, -7, -8, -9];
  constructor(player) {
    super("king", player);
  }

  getPath = (ID, board) => {
    const path = [];

    this.moveOptions.forEach((pos) => {
      if (withInBoardLimits(ID + pos) && this.moveIsPossible(board[ID + pos])) {
        path.push(ID + pos);
      }
    });
  };

  moveIsPossible = (moveToPiece) => {
    if (moveToPiece === null || moveToPiece.getPlayer() !== this.player) {
      return true;
    }
  };
}
