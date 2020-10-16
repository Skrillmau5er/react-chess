import piece from "./piece";
import { getDiagonalPath } from "./helperFunctions";

export default class bishop extends piece {
  constructor(player) {
    super("bishop", player);
  }

  getPath = (ID, board) => {
    return getDiagonalPath(ID, board, this.player);
  };
}
