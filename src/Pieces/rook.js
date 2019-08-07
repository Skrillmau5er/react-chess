import piece from './piece'

export default class rook extends piece {
  getPath(piece){
    let path = [];
    let pieceID = piece.pieceID;
    let currCol = pieceID % 8;
    if(currCol === 0) currCol = 8;

    //Get across columns
    for(let i = 1; i <= 8; i++){
      if(i !== currCol) path.push(pieceID - currCol + i);
    }

    //Get across rows
    for(let i = currCol; i <= 64; i += 8){
      if(i !== pieceID) path.push(i);
    }
    return path;
  }
}