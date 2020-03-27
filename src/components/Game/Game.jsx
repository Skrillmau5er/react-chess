import React, { useEffect, useState } from 'react';
import '../../styles/Game/ChessBoard.scss';
import BoardSquare from './BoardSquare';
import GameStatus from './GameStatus';
import queen from '../Pieces/queen';
import rook from '../Pieces/rook';
import bishop from '../Pieces/bishop';
import knight from '../Pieces/knight';
import pawn from '../Pieces/pawn';
import king from '../Pieces/king';
import { getGame, updateGame as gameUpdate } from '../../services';
import { toast } from 'react-toastify';

const Game = ({ match, history }) => {
  const [board, setBoard] = useState(null);
  const [activePiece, setActivePiece] = useState(null);
  const [totalMoves, setTotalMoves] = useState(0);
  const [turn, setTurn] = useState(1);
  const [lostPieces, setLostPieces] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [kingCheckStatus, setKingCheckStatus] = useState({
    checked: false,
    player: null
  });
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    getGame(match.params.gameID)
      .then(res => {
        console.log(res.data);
        setUpBoard(res.data.board);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error getting game data.');
      });
  }, []);

  //   componentDidMount() {
  //     this.interval = setInterval(() => this.tick(), 1000);
  //   }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  const setUpBoard = board => {
    const tempBoard = new Array(64).fill(null);

    board.map((x, i) => {
      if (x !== null) {
        if (x.name === 'rook') {
          tempBoard[i] = new rook('rook', x.player);
        }
        if (x.name === 'knight') {
          tempBoard[i] = new knight('knight', x.player);
        }
        if (x.name === 'bishop') {
          tempBoard[i] = new bishop('bishop', x.player);
        }
        if (x.name === 'king') {
          tempBoard[i] = new king('king', x.player);
        }
        if (x.name === 'queen') {
          tempBoard[i] = new queen('queen', x.player);
        }
        if (x.name === 'pawn') {
          tempBoard[i] = new pawn('pawn', x.player);
        }
      }
    });
    setBoard(tempBoard);
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

  const handlePieceClick = ID => {
    //Set active piece
    if (activePiece === null && board[ID] && board[ID].getPlayer() === turn) {
      console.log('Set Active Piece');
      setCurrentPath(board[ID].getPath(ID, board));
      setActive(true, ID);
    }
    //Unset active piece by clicking it
    else if (activePiece === ID) {
      console.log('Unset active piece');
      setActive(false, ID);
    }
    //Move piece if possible
    else if (activePiece !== ID && activePiece !== null && currentPath.includes(ID)) {
      console.log('Move piece if possible');
      movePiece(ID);
      setActive(false);
      updateGame();
    }
    //Unset by clicking out of range
    else if (activePiece) {
      console.log('Move piece if possible');
      setActive(false, ID);
    }
  };

  const setActive = (set, piece = null) => {
    if (set) {
      setActivePiece(piece);
    } else {
      setActivePiece(null);
      setCurrentPath(null);
    }
  };

  const movePiece = async moveToID => {
    //Remove first move for the pawn.
    if (board[activePiece].getName() === 'pawn') {
      if (board[activePiece].isFirstMove()) board[activePiece].firstMoveOver();
    }

    if (board[moveToID]) addToFallen(moveToID);
    board[moveToID] = board[activePiece];
    board[activePiece] = null;
    // board.forEach((piece, i) => {
    //   if (piece) isKingChecked(piece, i);
    // });
    setTotalMoves(totalMoves);
    let gameID = match.params.gameID;
    await gameUpdate({ gameID, board });
  };

  // const isKingChecked = (piece, ID) => {
  //   piece.getPath(ID, board).forEach(x => {
  //     if (board[x]) {
  //       if (board[x].getName() === 'king') {
  //         setKingCheckStatus({
  //           checked: true,
  //           player: board[x].getPlayer()
  //         });
  //       }
  //     }
  //   });
  // };

  const addToFallen = piece => {
    if (board[piece].getName() === 'king') {
      gameOver();
    }
    setLostPieces([
      ...lostPieces,
      { player: board[piece].getPlayer(), name: board[piece].getName() }
    ]);
  };

  const gameOver = () => {
    history.push('/game/results');
    setWinner(turn);
  };

  const updateGame = () => {
    switchTurns();
    setKingCheckStatus({
      checked: false,
      player: null
    });
    setTotalMoves(totalMoves + 1);
  };

  const switchTurns = () => {
    turn === 1 ? setTurn(2) : setTurn(1);
    if (activePiece) {
      setActivePiece(null);
      setCurrentPath(null);
    }
    if (currentPath) {
      setCurrentPath([]);
    }
  };

  //   resetTimeLeft = () => {
  //     this.setState({ timeLeft: 10 });
  //   };

  // const gameStart = () => {
  //   this.setState({
  //     activePiece: null,
  //     totalMoves: 0,
  //     //   timeLeft: 10,
  //     //   timer: null,
  //     turn: 1,
  //     lostPieces: [],
  //     currentPath: [],
  //     kingCheckStatus: {
  //       checked: false,
  //       pallyer: null
  //     },
  //     winner: null
  //   });
  //   this.setUpBoard();
  // };

  return (
    <div className='game-container'>
      {board && (
        <div className='chess-area'>
          <div className='chess-board'>
            {board.map((piece, id) => {
              return (
                <BoardSquare
                  key={id}
                  piece={piece}
                  color={
                    parseInt(id / 8) % 2 ? (id % 2 ? 'white' : 'grey') : id % 2 ? 'grey' : 'white'
                  }
                  onClick={() => handlePieceClick(id)}
                  active={id === activePiece}
                  path={currentPath ? currentPath.includes(id) : false}
                />
              );
            })}
          </div>
          <GameStatus turn={turn} /*timeLeft={timeLeft}*/ kingCheckStatus={kingCheckStatus} />
        </div>
      )}
    </div>
  );
};

export default Game;
