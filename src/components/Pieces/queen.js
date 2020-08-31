import piece from './piece'
import { getLinearPath, getDiagonalPath } from './helperFunctions'

export default class queen extends piece {
  getPath = (ID, board) => {
    let linearPath = getLinearPath(ID, board, this.player);
    let diagonalPath = getDiagonalPath(ID, board, this.player);
    let path = linearPath.concat(diagonalPath);
    return path;
  }
}