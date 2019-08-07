import piece from './piece'

export default class pawn extends piece {
  constructor(name,player){
    super(name,player)
    this.firstMove = true;
  }
  isFirstMove(){
    return this.firstMove;
  }
  
  getPath(piece,board){
    let pieceID = piece.pieceID;
    let path = [];
    if(this.firstMove){
      if(piece.player === 1){
        if(!board[pieceID - 1].piece) path.push(pieceID + 8);
        path.push(pieceID + 16);
      }
      else{
        path.push(pieceID - 8);
        path.push(pieceID - 16);
      }
    }
    else{
      if(piece.player === 1){
        path.push(pieceID + 8);
      }
      else{
        path.push(pieceID - 8);
      }
    }
    return path;
  }

  firstMoveOver(){
    this.firstMove = false;
  }
}