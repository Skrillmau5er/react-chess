import piece from './piece'
export default class bishop extends piece {
  getPath(piece){
    let path = [];
    let modPiece = piece % 8;
    if(modPiece !== 0){
      modPiece = 8 - modPiece;
      modPiece *= 2;
      for(let i = 0; i < modPiece; i += 2){
        if(i === 0){
        path.push(piece + 9);
        path.push(piece - 7);
        }
        else{
          path.push(path[i-2] + 9);
          path.push(path[i-1] - 7);
        }
      }
    }
    modPiece = piece % 8;
    if(modPiece !== 1){
      modPiece *= 2;
      for(let i = modPiece; i > 0 ; i -= 2){
        if(i === modPiece){
        path.push(piece + 7);
        path.push(piece - 9);
        }
        else{
          path.push(path[i-2] + 9);
          path.push(path[i-1] - 7);
        }
      }
      return path;
    }
  }
}