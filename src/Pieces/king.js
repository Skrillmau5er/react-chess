import piece from './piece'

export default class king extends piece {
  getPath(piece){
    const path = [];
    if(piece - 9) path.push(piece - 9);
    if(piece - 8) path.push(piece - 8);
    if(piece - 7) path.push(piece - 7);
    if(piece + 1) path.push(piece + 1);
    if(piece + 9) path.push(piece + 9);
    if(piece + 8) path.push(piece + 8);
    if(piece + 7) path.push(piece + 7);
    if(piece - 1) path.push(piece - 1);
    return path;
  }
}