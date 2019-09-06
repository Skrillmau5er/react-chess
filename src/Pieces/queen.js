import piece from './piece'

export default class queen extends piece {
  getPath(piece, board){
    let path = [];
    let pieceID = piece.pieceID;
    let nextPiece = pieceID - 9;
    let pieceEncountered = false;

    //Get diagonal paths

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

    // Get straight paths 
    // Get path to right
    nextPiece = pieceID + 1;
    pieceEncountered = false;
    while((nextPiece % 8 !== 1) && (board[nextPiece -1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece += 1;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }
    // Get path to left
    nextPiece = pieceID - 1;
    pieceEncountered = false;
    while((nextPiece % 8) && (board[nextPiece -1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece -= 1;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    // Get path up
    nextPiece = pieceID + 8;
    pieceEncountered = false;
    while((nextPiece <= 64) && (!pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece += 8;
      }
      else if(board[nextPiece - 1].piece.player === piece.piece.player){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    // Get path to down
    nextPiece = pieceID - 8;
    pieceEncountered = false;
    while((nextPiece > 0) && (board[nextPiece -1].piece === null || !pieceEncountered)){
      if(board[nextPiece - 1].piece === null){
        path.push(nextPiece);
        nextPiece -= 8;
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