import piece from "./piece";
import { getLinearPath } from "./helperFunctions";

export default class rook extends piece {
  constructor(player) {
    super("rook", player);
  }

  getPath = (ID, board) => {
    return getLinearPath(ID, board, this.player);
  };
}
