import React from 'react';
import boardSetUp from '../Board/Board.js';
import '../styles/ChessBoard.css';
import BoardSquare from './BoardSquare.js';
import BoardPiece from './BoardPiece';
import GameStatus from './GameStatus';

class ChessBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      board: boardSetUp,
      activePiece: null,
      turn: 1,
      lostPieces: [],
      currentPath: [],
      check: null,
    }
  };

  handlePieceClick = (piece) => {
    //Set active piece
    if(!(this.state.activePiece) && (piece.piece) && (piece.piece.player === this.state.turn)){
      this.setState({ currentPath : piece.piece.getPath(piece, this.state.board) })
      this.setActivePiece(piece,'set');
    }
    //Unset active piece by clicking it
    else if(this.state.activePiece === piece){
      this.setActivePiece(piece,'unset');
    }
    //Move piece if possible
    else if(this.state.activePiece !== piece && (this.state.activePiece) && this.pieceInPath(piece)){
      this.movePiece(piece);
    }
    //Remove active state by clicking outside of path
    else if((this.state.activePiece)){
      this.setActivePiece(piece, 'unset');
    }
  }

  setActivePiece = (piece, setOrUnset) => {
    if(setOrUnset === 'set'){
      this.setState({ activePiece : piece });
    }else{
      this.setState({ activePiece: null, currentPath: [] })
    }
  }

  pieceInPath = (piece) => {
    return this.state.currentPath.includes(piece.pieceID)
  }

  movePiece = (piece) => {
    //Remove first move for the pawn.
    if(this.state.activePiece.piece.getName() === 'pawn'){
      if(this.state.activePiece.piece.isFirstMove()){
        this.state.activePiece.piece.firstMoveOver();
      }
    }
    this.state.board.map(x => {
      if(x.pieceID === piece.pieceID){
        if(x.piece){
          this.addToFallen(x.piece);
        }
        x.piece = this.state.activePiece.piece;
        return x;
      }
      return x;
    });

    this.state.board.map(x => {
      if(x.pieceID === this.state.activePiece.pieceID){
        x.piece = null;
        return x;
      }
      return x;
    });
    this.setActivePiece('unset');
    this.updateGame();
    this.state.board.forEach(x => {
        if(x.piece && x.player === piece.player){
          this.isKingChecked(x);
        }
    });
  }

  isKingChecked = (piece) => {
    piece.piece.getPath(piece, this.state.board).forEach(x => {
      if (this.state.board[x-1].piece) {
        if (this.state.board[x-1].piece.getName() === 'king') {
          console.log('king is checked');
        }
      }
    });
  }

  addToFallen = (piece) => {
    this.setState({
      lostPieces: [...this.state.lostPieces, piece]
    })
  }

  updateGame = () => {
    (this.state.turn === 1) ? this.setState({ turn: 2 }) : this.setState({ turn: 1 }) 
    return;
  }

  render(){
    let board = this.state.board.map((piece, i) => {
      let boardPiece = null;

      if(piece.piece){
        boardPiece = <BoardPiece piece={piece.piece.getName()} player={piece.piece.player}/>;
      }
      return (
          <BoardSquare 
            key={piece.pieceID}
            pieceInfo={piece}
            color={piece.color}
            onClick={this.handlePieceClick.bind(this, piece)}
            active={(piece === this.state.activePiece ? true : false)}
            path={(this.state.currentPath) ? this.state.currentPath.includes(piece.pieceID) : false}
          >
            {boardPiece}
          </BoardSquare>
      )
    });
    return (
      <div className="chess-area">
        <div className="chess-board">
          {board}
        </div>
        <GameStatus turn={this.state.turn} lostPieces={this.state.lostPieces}/>
      </div>
    );
  }
}

export default ChessBoard;
