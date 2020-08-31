import piece from "./piece";
import { getLinearPath } from "./helperFunctions";

export default class rook extends piece {
  constructor(name, player) {
    super(name, player);
    this.firstMove = true;
  }

  isFirstMove = () => {
    return this.firstMove;
  };

  firstMoveOver = () => {
    this.firstMove = false;
  };

  getPath = (ID, board) => {
    return getLinearPath(ID, board, this.player);
  };
}
