import piece from './piece'

export default class knight extends piece {
  getPath(piece, board){
    let path = [];
    let pieceID = piece.pieceID;
    let currCol = pieceID % 8;
    if((pieceID - 17 > 0 && pieceID - 17 <= 64) && (currCol >= 2 || currCol === 0 )) {
       if(this.canMove(pieceID - 17, board, piece.piece.player)) path.push(pieceID - 17);
    }
    if((pieceID - 10 > 0 && pieceID - 10 <= 64) && (currCol >= 3 || currCol === 0 )) {
       if(this.canMove(pieceID - 10, board, piece.piece.player)) path.push(pieceID - 10);
    } 
    if((pieceID + 6 > 0 && pieceID + 6 <= 64) && (currCol >= 3 || currCol === 0 )) {
       if(this.canMove(pieceID + 6, board, piece.piece.player)) path.push(pieceID + 6);
    } 
    if((pieceID + 15 > 0 && pieceID + 15 <= 64) && (currCol >= 2 || currCol === 0 )) {
       if(this.canMove(pieceID + 15, board, piece.piece.player)) path.push(pieceID + 15);
    }
    if((pieceID - 15 > 0 && pieceID - 15 <= 64) && (currCol <= 7 && currCol !== 0)) {
       if(this.canMove(pieceID - 15, board, piece.piece.player)) path.push(pieceID - 15);
    } 
    if((pieceID - 6 > 0 && pieceID - 6 <= 64) && (currCol <= 6 && currCol !== 0)) {
       if(this.canMove(pieceID - 6, board, piece.piece.player)) path.push(pieceID - 6);
    } 
    if((pieceID + 10 > 0 && pieceID + 10 <= 64) && (currCol <= 6 && currCol !== 0)) {
       if(this.canMove(pieceID + 10, board, piece.piece.player)) path.push(pieceID + 10);
    }
    if((pieceID + 17 > 0 && pieceID + 17 <= 64) && (currCol <= 7 && currCol !== 0)) {
       if(this.canMove(pieceID + 17, board, piece.piece.player)) path.push(pieceID + 17);
    }
    return path;
  }

  canMove(pieceID, board, player){
    if(board[pieceID - 1].piece === null || board[pieceID - 1].piece.player !== player){
      return true;
    }
  }
}