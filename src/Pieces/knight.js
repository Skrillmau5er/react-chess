import piece from './piece'

export default class knight extends piece {
  getPath(piece){
    let path = [];
    let modPiece = piece % 8;
    if(piece - 17 && (modPiece >= 2 || modPiece === 0 )) path.push(piece - 17); 
    if(piece - 10 && (modPiece >= 3 || modPiece === 0 )) path.push(piece - 10); 
    if(piece + 6 && (modPiece >= 3 || modPiece === 0 )) path.push(piece + 6); 
    if(piece + 15 && (modPiece >= 2 || modPiece === 0 )) path.push(piece + 15);
    if(piece - 15 && (modPiece <= 7 && modPiece !== 0)) path.push(piece - 15); 
    if(piece - 6 && (modPiece <= 6 && modPiece !== 0)) path.push(piece - 6); 
    if(piece + 10 && (modPiece <= 6 && modPiece !== 0)) path.push(piece + 10);
    if(piece + 17 && (modPiece <= 7 && modPiece !== 0)) path.push(piece + 17);
    return path;
  }
}