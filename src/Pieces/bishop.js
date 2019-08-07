import piece from './piece'
export default class bishop extends piece {
  getPath(piece, board){
    let path = [];
    let currCol = piece.pieceID % 8;
    let leftUp, leftDown, rightUp, rightDown;
    leftUp = leftDown = rightUp = rightDown = piece.pieceID;
    if(currCol === 0) currCol = 8;

    //Get path to left of piece
    for(let i = currCol; i > 1; i--){
      leftUp += 7;
      leftDown -= 9;
      path.push(leftUp);
      if(leftDown) path.push(leftDown);
    }

    //Get path right of piece
    for(let i = currCol; i < 8; i++){
      rightUp += 9;
      rightDown -= 7;
      path.push(rightUp);
      if(rightDown) path.push(rightDown);
    }
    return path;
  }
}