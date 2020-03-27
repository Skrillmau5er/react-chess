import piece from './piece'

export default class rook extends piece {
  getPath(ID ,board){
    let path = [];
    let nextPiece = ID + 1;
    let pieceEncountered = false;
    
    // Get path to right
    while((nextPiece % 8 !== 0) && (board[nextPiece] === null || !pieceEncountered)){
      if(board[nextPiece] === null){
        path.push(nextPiece);
        nextPiece += 1;
      }
      else if(board[nextPiece].getPlayer() === board[ID].getPlayer()){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }
    // Get path to left
    nextPiece = ID - 1;
    pieceEncountered = false;
    while((nextPiece % 8 >= 0 && nextPiece % 8 !== 7) && (board[nextPiece] === null || !pieceEncountered)){
      if(board[nextPiece] === null){
        path.push(nextPiece);
        nextPiece -= 1;
      }
      else if(board[nextPiece].getPlayer() === board[ID].getPlayer()){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    // Get path up
    nextPiece = ID + 8;
    pieceEncountered = false;
    while((nextPiece < 64) && (!pieceEncountered)){
      if(board[nextPiece] === null){
        path.push(nextPiece);
        nextPiece += 8;
      }
      else if(board[nextPiece].getPlayer() === board[ID].getPlayer()){
        pieceEncountered = true;
      }
      else{
        pieceEncountered = true;
        path.push(nextPiece);
      }
    }

    // Get path to down
    nextPiece = ID - 8;
    pieceEncountered = false;
    while((nextPiece > 0) && (board[nextPiece] === null || !pieceEncountered)){
      if(board[nextPiece] === null){
        path.push(nextPiece);
        nextPiece -= 8;
      }
      else if(board[nextPiece].getPlayer() === board[ID].getPlayer()){
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