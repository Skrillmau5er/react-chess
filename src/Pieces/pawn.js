import piece from './piece'

export default class pawn extends piece {
  constructor(name,player){
    super(name,player)
    this.firstMove = true;
  }
  isFirstMove(){
    return this.firstMove;
  }

  // Make sure pawn can't attack when in far right or left column.
  
  getPath(piece,board){
    let pieceID = piece.pieceID;
    let path = [];
    let currCol = pieceID % 8;
    if(this.firstMove){
      if(piece.piece.player === 1){
        //Check attack
        if(board[pieceID + 6].piece !== null && board[pieceID + 6].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID + 7);
        if(board[pieceID + 8].piece !== null && board[pieceID + 8].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID + 9);

        if(board[pieceID + 7].piece == null){
          path.push(pieceID + 8);
          if(board[pieceID + 15].piece == null) path.push(pieceID + 16);
        }
        
      }
      else{
        //Check attack
        if(board[pieceID - 8].piece !== null && board[pieceID - 8].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID - 7);
        if(board[pieceID - 10].piece !== null && board[pieceID - 10].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID - 9);
        
        if(board[pieceID - 9].piece == null) {
          path.push(pieceID - 8);
          if(board[pieceID -17].piece == null) path.push(pieceID - 16);
        }
      }
    }
    else{
      if(piece.piece.player === 1){
        //Check attack
        if(board[pieceID + 6].piece !== null && board[pieceID + 6].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID + 7);
        if(board[pieceID + 8].piece !== null && board[pieceID + 8].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID + 9);

        if(board[pieceID + 7].piece == null) path.push(pieceID + 8);
      }
      else{
        //Check attack
        if(board[pieceID - 8].piece !== null && board[pieceID - 8].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID - 7);
        if(board[pieceID - 10].piece !== null && board[pieceID - 10].piece.player !== piece.piece.player && currCol > 1) path.push(pieceID - 9);

        if(board[pieceID - 9].piece == null) path.push(pieceID - 8);
      }
    }
    return path;
  }

  firstMoveOver(){
    this.firstMove = false;
  }
}

