import piece from './piece'

export default class pawn extends piece {
  constructor(name,player){
    super(name,player)
    this.firstMove = true;
  }
  isFirstMove(){
    return this.firstMove;
  }
  
  getPath(piece,player){
    let path = [];
    if(this.firstMove){
      if(player === 1){
        path.push(piece + 8);
        path.push(piece + 16);
      }
      else{
        path.push(piece - 8);
        path.push(piece - 16);
      }
    }
    else{
      if(player === 1){
        path.push(piece + 8);
      }
      else{
        path.push(piece - 8);
      }
    }
    return path;
  }

  firstMoveOver(){
    this.firstMove = false;
  }
}