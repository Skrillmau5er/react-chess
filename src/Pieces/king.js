import piece from './piece'

export default class king extends piece {
  getPath(piece, board){
    let pieceID = piece.pieceID;
    const path = [];
    if((pieceID - 9) > 0 && (pieceID - 9) <= 64){ 
      if(this.canMoveHere(pieceID - 9, board, piece.piece.player)) path.push(pieceID - 9);
    }
    if((pieceID - 8) > 0 && (pieceID - 8) <= 64){ 
      if(this.canMoveHere(pieceID - 8, board, piece.piece.player)) path.push(pieceID - 8);
    }
    if((pieceID - 7) > 0 && (pieceID - 7) <= 64){ 
      if(this.canMoveHere(pieceID - 7, board, piece.piece.player)) path.push(pieceID - 7);
    }
    if((pieceID + 1) > 0 && (pieceID + 1) <= 64){ 
      if(this.canMoveHere(pieceID + 1, board, piece.piece.player)) path.push(pieceID + 1);
    }
    if((pieceID + 9) > 0 && (pieceID + 9) <= 64){ 
      if(this.canMoveHere(pieceID + 9, board, piece.piece.player)) path.push(pieceID + 9);
    }
    if((pieceID + 8) > 0 && (pieceID + 9) <= 64){ 
      if(this.canMoveHere(pieceID + 8, board, piece.piece.player)) path.push(pieceID + 8);
    }
    if((pieceID + 7) > 0 && (pieceID + 7) <= 64){ 
      if(this.canMoveHere(pieceID + 7, board, piece.piece.player)) path.push(pieceID + 7);
    }
    if((pieceID - 1) > 0 && (pieceID - 1) <= 64){ 
      if(this.canMoveHere(pieceID - 1, board, piece.piece.player)) path.push(pieceID - 1);
    }
    return path;
  }

  canMoveHere(pieceID, board, player){
    if(board[pieceID - 1].piece === null || board[pieceID - 1].piece.player !== player){
      return true;
    }
  }
}