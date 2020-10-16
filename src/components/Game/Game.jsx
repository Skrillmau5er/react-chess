import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "../../styles/Game/ChessBoard.scss";
import BoardSquare from "./BoardSquare";
import GameStatus from "./GameStatus";
import queen from "../Pieces/queen";
import rook from "../Pieces/rook";
import bishop from "../Pieces/bishop";
import knight from "../Pieces/knight";
import pawn from "../Pieces/pawn";
import king from "../Pieces/king";
import { getGame, updateGame as gameUpdate, setGameOver, getUser, deleteGame as deleteGameById } from "../../services";
import { toast } from "react-toastify";
import { createAnimation } from "../Utils/SkeletonBoardAnimation";
import { Typography, Paper, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import GameMenu from "./GameMenu";

const developEnv = process.env.NODE_ENV === "development";

const Game = ({ match, history, user, setHideMenu }) => {
  const [board, setBoard] = useState(null);
  const [moves, setMoves] = useState(null);
  const [turn, setTurn] = useState(null);
  const [activePiece, setActivePiece] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const [totalMoves, setTotalMoves] = useState(0);
  const [lostPieces, setLostPieces] = useState([]);
  const [players, setPlayers] = useState([null, null]);
  const [opponent, setOpponent] = useState(null);
  const [kingCheckStatus, setKingCheckStatus] = useState({
    checked: false,
    player: null,
  });
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [whatIfMode, setWhatIfMode] = useState(false);
  const [showBoardError, setShowBoardError] = useState(false);
  const [lastMoveAnimation, setLastMoveAnimation] = useState();

  useEffect(() => {
    setHideMenu(true);
    setUpGame();
    return () => setHideMenu(false);
  }, []);

  const setUpGame = () => {
    getGame(match.params.gameID)
      .then((game) => {
        if (!game.data.deleted && game.data.inProgress) {
          setUpGameData(game.data);
        } else {
          // Because there is two history pushes, it is impossible to get back to home through the back button if the game is over.
          history.replace(`/game/${match.params.gameID}/results`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error getting game data.");
      });
  };

  const getOpponent = async (players) => {
    try {
      if (players[1]) {
        let newOpponent = await getUser(players[user.uid === players[0] ? 1 : 0]);
        setOpponent(newOpponent.data);
      } else {
        setOpponent(null);
      }
    } catch (err) {
      toast.error("Failed to fetch Opponent data. They may have deleted their account.");
    }
  };

  const setUpBoard = (gameBoard) => {
    const tempBoard = new Array(64).fill(null);
    gameBoard.map((piece, pos) => {
      if (piece !== null) {
        tempBoard[pos] = createPiece(piece);
      }
    });
    setBoard(tempBoard);
  };

  const createPiece = (piece) => {
    if (piece.name === "rook") return new rook(piece.player);

    if (piece.name === "knight") return new knight(piece.player);

    if (piece.name === "bishop") return new bishop(piece.player);

    if (piece.name === "king") return new king(piece.player);

    if (piece.name === "queen") return new queen(piece.player);

    if (piece.name === "pawn") return new pawn(piece.player, piece.firstMove);
  };

  const showLastMove = (moves) => {
    if (moves.length) {
      let lastMove = moves[moves.length - 1];
      let animationMove = animateMove(lastMove.to, lastMove.from);
      let pieceTaken = lastMove?.pieceTaken && createPiece(lastMove.pieceTaken);

      setLastMoveAnimation({
        currentPosition: lastMove.to,
        lastPosition: lastMove.from,
        animationMove,
        pieceTaken,
      });
    }
  };

  const setUpGameData = (game) => {
    if (!game.players.includes(user.uid)) {
      history.push("/");
    }
    setPlayers(game.players);
    setTurn(game.turn);
    setTotalMoves(game.totalMoves);
    setMoves(game.moves);
    getOpponent(game.players);
    setUpBoard(game.board);
    showLastMove(game.moves);
  };

  const onPieceClick = (ID) => {
    if (user.uid === players[turn] || whatIfMode || developEnv) {
      //Set active piece
      if (activePiece === null && board[ID] && board[ID].getPlayer() === turn) {
        setCurrentPath(board[ID].getPath(ID, board));
        setActive(true, ID);
      }
      //Unset active piece by clicking it
      else if (activePiece === ID) {
        setActive(false);
      }
      //Move piece if possible
      else if (activePiece !== ID && activePiece !== null && currentPath.includes(ID)) {
        movePiece(ID);
      }
      //Unset by clicking out of range
      else if (activePiece) {
        setActive(false);
      }
    } else {
      handleBoardError();
    }
  };

  const handleBoardError = () => {
    if (!showBoardError) {
      setShowBoardError(true);
      setTimeout(() => setShowBoardError(false), 500);
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

  const movePiece = (moveToID) => {
    let tempBoard = [...board];
    updateFirstMove(tempBoard, activePiece);

    tempBoard[moveToID] = tempBoard[activePiece];
    tempBoard[activePiece] = null;

    if (whatIfMode) {
      setBoard(tempBoard);
      updateGame();
      setActive(false);
    } else {
      updateGamePost(tempBoard, board, moveToID, activePiece, match.params.gameID);
    }
  };

  const updateGamePost = async (tempBoard, board, moveToID, activePiece, gameID) => {
    const wasPieceTaken = () => {
      if (board[moveToID]) {
        return {
          position: moveToID,
          piece: board[moveToID],
        };
      } else {
        return null;
      }
    };

    let tempMoves = [...moves];
    tempMoves.push({
      from: activePiece,
      to: moveToID,
      piece: board[activePiece].getName(),
      player: players[turn],
      pieceTaken: wasPieceTaken(),
    });

    try {
      await gameUpdate({
        gameID,
        board: tempBoard,
        totalMoves,
        turn,
        moves: tempMoves,
      });
      setBoard(tempBoard);
      setMoves(tempMoves);
      if (board[moveToID]) {
        addToLostPieces(moveToID);
      }
      updateGame();
    } catch (err) {
      toast.error("We couldn'nt complete your move. Please try again later");
    } finally {
      setActive(false);
    }
  };

  const updateFirstMove = (board, activePiece) => {
    if (board[activePiece].getName() === "pawn") {
      if (board[activePiece].isFirstMove()) board[activePiece].firstMoveOver();
    }
  };

  const animateMove = (oldSpot, newSpot) => {
    let newRow = Math.floor(newSpot / 8);
    let oldRow = Math.floor(oldSpot / 8);
    let newCol = newSpot % 8;
    let oldCol = oldSpot % 8;
    let boardSquareWidth = document.getElementsByClassName("board-square")[0].offsetWidth;
    return [
      (oldCol - newCol) * boardSquareWidth * (flipBoard ? -1 : 1),
      (oldRow - newRow) * boardSquareWidth * (flipBoard ? -1 : 1),
    ];
  };

  const addToLostPieces = (piece) => {
    setLostPieces([...lostPieces, { player: board[piece].getPlayer(), name: board[piece].getName() }]);
    if (board[piece].getName() === "king") {
      gameOver();
    }
  };

  const gameOver = async () => {
    let gameID = match.params.gameID;
    await setGameOver({ gameID, winner: players[turn] });
    history.push(`/game/${gameID}/results`);
  };

  const updateGame = async () => {
    setActivePiece(null);
    setCurrentPath(null);
    setTurn(turn ? 0 : 1);
    setKingCheckStatus({
      checked: false,
      player: null,
    });
    setTotalMoves(totalMoves + 1);
  };

  const deleteGame = () => {
    deleteGameById(match.params.gameID, opponent.uid)
      .then((res) => {
        toast.success("Game Successfully forfeited");
        history.push("/");
      })
      .catch((err) => {
        toast.error("Error Forfeiting Game", err);
        setShowGameMenu(false);
      });
  };

  const determineSquareColor = (id) => {
    return parseInt(id / 8) % 2 ? (id % 2 ? "white" : "grey") : id % 2 ? "grey" : "white";
  };

  const toggleWhatIfMode = () => {
    if (whatIfMode) {
      setWhatIfMode(false);
      setUpGame();
    } else {
      setWhatIfMode(true);
    }
    setShowGameMenu(false);
  };

  const flipBoard = () => (whatIfMode || developEnv ? user.uid === players[0] : players[turn] === players[0]);

  return (
    <div className="game-container">
      {board ? (
        <div className="chess-area">
          <GameMenu
            deleteGame={deleteGame}
            history={history}
            toggleWhatIfMode={toggleWhatIfMode}
            showGameMenu={showGameMenu}
            setShowGameMenu={setShowGameMenu}
            whatIfMode={whatIfMode}
          />
          {whatIfMode && (
            <div className="text-center flex flex-col justify-center">
              <Typography variant="h5" component="div">
                What If Mode Enabled
              </Typography>
              <div>
                <Button onClick={() => setWhatIfMode(false)} color="primary">
                  Turn off
                </Button>
              </div>
            </div>
          )}
          {showBoardError && <Paper className="not-your-turn absolute bg-red-500 p-4">It's not your turn yet!</Paper>}
          <div className={classNames("chess-board mt-5", showBoardError && "board-error", flipBoard() && "flip")}>
            {board.map((piece, id) => {
              return (
                <BoardSquare
                  flip={flipBoard()}
                  key={id}
                  piece={piece}
                  color={determineSquareColor(id)}
                  onClick={() => onPieceClick(id)}
                  active={id === activePiece}
                  path={currentPath ? currentPath.includes(id) : false}
                  lastMoveAnimation={lastMoveAnimation?.currentPosition === id && lastMoveAnimation}
                  lastPieceTaken={lastMoveAnimation?.pieceTaken?.position === id && lastMoveAnimation.pieceTaken}
                />
              );
            })}
          </div>
          <GameStatus
            kingCheckStatus={kingCheckStatus}
            userUid={user.uid}
            turn={turn}
            playerTurnData={players[turn] === user.uid ? user : opponent}
            totalMoves={totalMoves}
          />
        </div>
      ) : (
        <>
          {createAnimation()}
          <Skeleton height={250} className="mx-auto w-100 max-w-md" />
        </>
      )}
    </div>
  );
};

export default Game;

// Unused Features
//   componentDidMount() {
//     this.interval = setInterval(() => this.tick(), 1000);
//   }

// componentWillUnmount() {
//   clearInterval(this.interval);
// }

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

// board.forEach((piece, i) => {
//   if (piece) isKingChecked(piece, i);
// });
