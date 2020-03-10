import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import newGame from '../../services';
import '../../styles/Game/ChessBoard.scss';
import BoardSquare from './BoardSquare';
import GameStatus from './GameStatus';
import Results from './Results';
import queen from '../../Pieces/queen';
import rook from '../../Pieces/rook';
import bishop from '../../Pieces/bishop';
import knight from '../../Pieces/knight';
import pawn from '../../Pieces/pawn';
import king from '../../Pieces/king';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      activePiece: null,
      totalMoves: 0,
      //timeLeft: 10,
      //timer: null,
      turn: 1,
      lostPieces: [],
      currentPath: [],
      kingCheckStatus: {
        checked: false,
        pallyer: null
      },
      winner: null
    };
  }

  componentWillMount() {
    this.setUpBoard();
    newGame(this.state);
  }

//   componentDidMount() {
//     this.interval = setInterval(() => this.tick(), 1000);
//   }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  setUpBoard = () => {
    const tempBoard = new Array(64).fill(null);
    //Player 1 Setup
    tempBoard[0] = new rook('rook', 1);
    tempBoard[1] = new knight('knight', 1);
    tempBoard[2] = new bishop('bishop', 1);
    tempBoard[3] = new king('king', 1);
    tempBoard[4] = new queen('queen', 1);
    tempBoard[5] = new bishop('bishop', 1);
    tempBoard[6] = new knight('knight', 1);
    tempBoard[7] = new rook('rook', 1);
    for (let i = 8; i < 16; i++) tempBoard[i] = new pawn('pawn', 1);

    //Player 2 Setup
    for (let i = 48; i < 56; i++) tempBoard[i] = new pawn('pawn', 2);
    tempBoard[56] = new rook('rook', 2);
    tempBoard[57] = new knight('knight', 2);
    tempBoard[58] = new bishop('bishop', 2);
    tempBoard[59] = new king('king', 2);
    tempBoard[60] = new queen('queen', 2);
    tempBoard[61] = new bishop('bishop', 2);
    tempBoard[62] = new knight('knight', 2);
    tempBoard[63] = new rook('rook', 2);
    this.setState({
      board: tempBoard
    });
  };

//   tick = async () => {
//     await this.setState({
//       timeLeft: this.state.timeLeft - 1
//     });
//     if (this.state.timeLeft === 0) {
//       this.switchTurns();
//       this.resetTimeLeft();
//     }
//   };

  handlePieceClick = ID => {
    const { activePiece, board, turn } = this.state;
    //Set active piece
    if (activePiece === null && board[ID] && board[ID].getPlayer() === turn) {
      this.setState({
        currentPath: board[ID].getPath(ID, board)
      });
      this.setActivePiece(ID, 'set');
    }
    //Unset active piece by clicking it
    else if (activePiece === ID) this.setActivePiece(ID, 'unset');
    //Move piece if possible
    else if (activePiece !== ID && activePiece !== null && this.state.currentPath.includes(ID)) {
      this.movePiece(ID);
      this.setActivePiece('unset');
      this.updateGame();
    }
    //Unset by clicking out of range
    else if (activePiece) this.setActivePiece(ID, 'unset');
  };

  setActivePiece = (piece, setOrUnset) => {
    setOrUnset === 'set'
      ? this.setState({ activePiece: piece })
      : this.setState({ activePiece: null, currentPath: null });
  };

  movePiece = moveToID => {
    const { activePiece, board } = this.state;
    //Remove first move for the pawn.
    if (board[activePiece].getName() === 'pawn') {
      if (board[activePiece].isFirstMove()) board[activePiece].firstMoveOver();
    }

    if (board[moveToID]) this.addToFallen(moveToID);
    board[moveToID] = board[activePiece];
    board[activePiece] = null;
    board.forEach((piece, i) => {
      if (piece) this.isKingChecked(piece, i);
    });
    this.setState({ totalMoves: this.state.totalMoves++ });
  };

  isKingChecked = (piece, ID) => {
    const { board } = this.state;
    piece.getPath(ID, board).forEach(x => {
      if (board[x]) {
        if (board[x].getName() === 'king') {
          this.setState({
            kingCheckStatus: {
              checked: true,
              player: board[x].getPlayer()
            }
          });
        }
      }
    });
  };

  addToFallen = piece => {
    const { board, lostPieces } = this.state;
    if (board[piece].getName() === 'king') {
      this.gameOver();
    }
    this.setState({
      lostPieces: [
        ...lostPieces,
        { player: board[piece].getPlayer(), name: board[piece].getName() }
      ]
    });
  };

  gameOver = () => {
    this.props.history.push('/game/results');
    this.setState({ winner: this.state.turn });
  };

  updateGame = () => {
    this.switchTurns();
    this.setState({
      kingCheckStatus: {
        checked: false,
        player: null
      }
    });
    this.setState({
      totalMoves: this.state.totalMoves++
    });
  };

  switchTurns = () => {
    this.state.turn === 1 ? this.setState({ turn: 2 }) : this.setState({ turn: 1 });
    if (this.state.activePiece) this.setState({ activePiece: null, currentPath: [] });
    if (this.state.currentPath) this.setState({ currentPath: [] });
  };

//   resetTimeLeft = () => {
//     this.setState({ timeLeft: 10 });
//   };

  gameStart = () => {
    this.setState({
      activePiece: null,
      totalMoves: 0,
    //   timeLeft: 10,
    //   timer: null,
      turn: 1,
      lostPieces: [],
      currentPath: [],
      kingCheckStatus: {
        checked: false,
        pallyer: null
      },
      winner: null
    });
    this.setUpBoard();
  };

  render() {
    const {
      state: {
        activePiece,
        currentPath,
        board,
        turn,
        lostPieces,
        kingCheckStatus,
        // timeLeft,
        winner,
        totalMoves
      },
      gameStart
    } = this;
    return (
      <>
        <div className='game-container' />
        <Switch>
          <Route
            exact
            path={this.props.match.path}
            render={() => (
              <div className='chess-area'>
                <div className='chess-board'>
                  {board.map((piece, id) => {
                    return (
                      <BoardSquare
                        key={id}
                        piece={piece}
                        color={
                          parseInt(id / 8) % 2
                            ? id % 2
                              ? 'white'
                              : 'grey'
                            : id % 2
                            ? 'grey'
                            : 'white'
                        }
                        onClick={this.handlePieceClick.bind(this, id)}
                        active={id === activePiece}
                        path={currentPath ? currentPath.includes(id) : false}
                      />
                    );
                  })}
                </div>
                <GameStatus turn={turn} /*timeLeft={timeLeft}*/ kingCheckStatus={kingCheckStatus} />
              </div>
            )}
          />
          <Route
            exact
            path={`${this.props.match.path}results/`}
            render={props => (
              <Results
                {...props}
                lostPieces={lostPieces}
                winner={winner}
                totalMoves={totalMoves}
                startNewGame={gameStart}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(Game);
