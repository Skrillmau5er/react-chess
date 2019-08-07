import piece from './piece'

export default class knight extends piece {
  getPath(piece){
    let path = [];
    let pieceID = piece.pieceID;
    let currCol = pieceID % 8;
    if(pieceID - 17 && (currCol >= 2 || currCol === 0 )) path.push(pieceID - 17); 
    if(pieceID - 10 && (currCol >= 3 || currCol === 0 )) path.push(pieceID - 10); 
    if(pieceID + 6 && (currCol >= 3 || currCol === 0 )) path.push(pieceID + 6); 
    if(pieceID + 15 && (currCol >= 2 || currCol === 0 )) path.push(pieceID + 15);
    if(pieceID - 15 && (currCol <= 7 && currCol !== 0)) path.push(pieceID - 15); 
    if(pieceID - 6 && (currCol <= 6 && currCol !== 0)) path.push(pieceID - 6); 
    if(pieceID + 10 && (currCol <= 6 && currCol !== 0)) path.push(pieceID + 10);
    if(pieceID + 17 && (currCol <= 7 && currCol !== 0)) path.push(pieceID + 17);
    return path;
  }
}