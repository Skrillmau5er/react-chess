import piece from './piece'

export default class queen extends piece {
  getPath(piece){
    let path = [];
    let pieceID = piece.pieceID;
    let currCol = pieceID % 8;
    let leftUp, leftDown, rightUp, rightDown;
    leftUp = leftDown = rightUp = rightDown = pieceID;
    if(currCol === 0) currCol = 8;

    //Get path to left of piece diagonal
    for(let i = currCol; i > 1; i--){
      leftUp += 7;
      leftDown -= 9;
      path.push(leftUp);
      if(leftDown) path.push(leftDown);
    }

    //Get path right of piece diagonal
    for(let i = currCol; i < 8; i++){
      rightUp += 9;
      rightDown -= 7;
      path.push(rightUp);
      if(rightDown) path.push(rightDown);
    }

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