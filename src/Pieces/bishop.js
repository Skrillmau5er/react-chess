import piece from './piece'
export default class bishop extends piece {
  getPath(piece, board){
    let path = [];
    let pieceID = piece.pieceID;
    let nextPiece = pieceID - 9;
    let pieceEncountered = false;

    //Get path left up
    while(nextPiece > 0 && nextPiece % 8 > 0 && (board[nextPiece - 1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece -= 9;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    //Get path right up
    nextPiece = pieceID - 7;
    pieceEncountered = false;
    while(nextPiece > 0 && nextPiece % 8 !== 1 && (board[nextPiece - 1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece -= 7;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    //Get path left down
    nextPiece = pieceID + 7;
    pieceEncountered = false;
    while(nextPiece <= 64 && nextPiece % 8 > 0 && (board[nextPiece - 1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece += 7;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    //Get path left down
    nextPiece = pieceID + 9;
    pieceEncountered = false;
    while(nextPiece <= 64 && nextPiece % 8 !== 1 && (board[nextPiece - 1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece += 9;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }


    return path;
  }
}