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
import { getGame, updateGame as gameUpdate, setGameOver } from '../../services';
import { toast } from 'react-toastify';
import { createAnimation } from '../Utils/SkeletonBoardAnimation';

const Game = ({ match, history, game }) => {
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

  useEffect(() => {
    getGame(match.params.gameID)
      .then(game => {
        if (!game.data.deleted && game.data.inProgress) {
          setUpGame(game.data);
        } else {
          // Becuase there is two history pushes, it is impossible to get back to home through the back button if the game is over.
          history.push(`/game/${match.params.gameID}/results`);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Error getting game data.');
      });
  }, []);

  //   componentDidMount() {
  //     this.interval = setInterval(() => this.tick(), 1000);
  //   }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  const setUpGame = gameData => {
    const tempBoard = new Array(64).fill(null);

    gameData.board.map((x, i) => {
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
    setTurn(gameData.turn);
    setTotalMoves(gameData.totalMoves);
    setBoard(tempBoard);
  };

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
    let gameID = match.params.gameID;
    try {
      await gameUpdate({ gameID, board, totalMoves, turn });
      setBoard(board);
      setActive(false);
      updateGame();
    } catch (err) {
      toast.error('OH NOOO');
    }
    // board.forEach((piece, i) => {
    //   if (piece) isKingChecked(piece, i);
    // });
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

  const gameOver = async () => {
    let gameID = match.params.gameID;
    await setGameOver({ gameID, winner: turn });
    history.push(`/game/${gameID}/results`);
  };

  const updateGame = async () => {
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

  return (
    <div className='game-container'>
      {board ? (
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
          <GameStatus turn={turn} kingCheckStatus={kingCheckStatus} />
        </div>
      ) : (
        createAnimation()
      )}
    </div>
  );
};

export default Game;
