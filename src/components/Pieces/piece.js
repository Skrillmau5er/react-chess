export default class Piece {
  constructor(name,player){
    this.name = name;
    this.player = player;
  }

  getName(){
    return this.name;
  }
  
  getPlayer(){
    return this.player;
  }
}