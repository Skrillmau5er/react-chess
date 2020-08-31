import piece from "./piece";
import { getDiagonalPath } from "./helperFunctions";

export default class bishop extends piece {
  getPath = (ID, board) => {
    return getDiagonalPath(ID, board, this.player);
  };
}
