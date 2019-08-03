import piece from './piece'

export default class rook extends piece {
  getPath(piece){
    let path = [];
    let modPiece = piece % 8;
    if(modPiece === 0) modPiece = 8;
    for(let i = 1; i <= 8; i++){
      if(piece === modPiece )
      path.push(piece - modPiece + i);
    }
    return path;
  }
}