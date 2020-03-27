import piece from './piece'

export default class king extends piece {
  getPath(ID, board){ 
    const path = [];
    let piece = board[ID];
    if((ID - 9) >= 0 && (ID - 9) <= 63){ 
      if(this.canMoveHere(ID - 9, board, piece.getPlayer())) path.push(ID - 9);
    }
    if((ID - 8) >= 0 && (ID - 8) <= 63){ 
      if(this.canMoveHere(ID - 8, board, piece.getPlayer())) path.push(ID - 8);
    }
    if((ID - 7) >= 0 && (ID - 7) <= 63){ 
      if(this.canMoveHere(ID - 7, board, piece.getPlayer())) path.push(ID - 7);
    }
    if((ID + 1) >= 0 && (ID + 1) <= 63){ 
      if(this.canMoveHere(ID + 1, board, piece.getPlayer())) path.push(ID + 1);
    }
    if((ID + 9) >= 0 && (ID + 9) <= 63){ 
      if(this.canMoveHere(ID + 9, board, piece.getPlayer())) path.push(ID + 9);
    }
    if((ID + 8) >= 0 && (ID + 9) <= 63){ 
      if(this.canMoveHere(ID + 8, board, piece.getPlayer())) path.push(ID + 8);
    }
    if((ID + 7) >= 0 && (ID + 7) <= 63){ 
      if(this.canMoveHere(ID + 7, board, piece.getPlayer())) path.push(ID + 7);
    }
    if((ID - 1) >= 0 && (ID - 1) <= 63){ 
      if(this.canMoveHere(ID - 1, board, piece.getPlayer())) path.push(ID - 1);
    }
    return path;
  }

  canMoveHere(ID, board, player){
    if(board[ID] === null || board[ID].getPlayer() !== player){
      return true;
    }
  }
}