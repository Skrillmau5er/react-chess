import piece from './piece'

export default class knight extends piece {
  getPath(ID, board){
    let path = [];
    let currCol = ID % 8;
    if(this.isLegal(ID - 17, currCol, 1)) {
       if(this.canMove(ID - 17, board, board[ID].getPlayer())) path.push(ID - 17);
    }
    if(this.isLegal(ID - 10, currCol, 2)) {
       if(this.canMove(ID - 10, board, board[ID].getPlayer())) path.push(ID - 10);
    } 
    if(this.isLegal(ID + 6, currCol, 2)) {
       if(this.canMove(ID + 6, board, board[ID].getPlayer())) path.push(ID + 6);
    } 
    if(this.isLegal(ID + 15, currCol, 1)) {
       if(this.canMove(ID + 15, board, board[ID].getPlayer())) path.push(ID + 15);
    }
    if(this.isLegal(ID - 15, currCol, 6)) {
       if(this.canMove(ID - 15, board, board[ID].getPlayer())) path.push(ID - 15);
    } 
    if(this.isLegal(ID - 6, currCol, 5)) {
       if(this.canMove(ID - 6, board, board[ID].getPlayer())) path.push(ID - 6);
    } 
    if(this.isLegal(ID + 10, currCol, 5)) {
       if(this.canMove(ID + 10, board, board[ID].getPlayer())) path.push(ID + 10);
    }
    if(this.isLegal(ID + 17, currCol, 6)) {
       if(this.canMove(ID + 17, board, board[ID].getPlayer())) path.push(ID + 17);
    }
    return path;
  }

  isLegal(moveID, currCol, colBorder) {
    if (colBorder > 4) {
      if((moveID > 0 && moveID + 15 <= 64) && currCol <= colBorder) {
        return true;
      }
    }
    else{
      if((moveID > 0 && moveID + 15 <= 64) && currCol >= colBorder) {
        return true;
      }
    }
    return false;
  }

  canMove(ID, board, player){
    if(board[ID] === null || board[ID].getPlayer() !== player){
      return true;
    }
  }
}