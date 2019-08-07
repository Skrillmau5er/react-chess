import piece from './piece'

export default class king extends piece {
  getPath(piece){
    let pieceID = piece.pieceID;
    const path = [];
    if(pieceID - 9) path.push(pieceID - 9);
    if(pieceID - 8) path.push(pieceID - 8);
    if(pieceID - 7) path.push(pieceID - 7);
    if(pieceID + 1) path.push(pieceID + 1);
    if(pieceID + 9) path.push(pieceID + 9);
    if(pieceID + 8) path.push(pieceID + 8);
    if(pieceID + 7) path.push(pieceID + 7);
    if(pieceID - 1) path.push(pieceID - 1);
    return path;
  }
}