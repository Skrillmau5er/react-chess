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
import {
  getGame,
  updateGame as gameUpdate,
  setGameOver,
  getUser,
  deleteGame as deleteGameById,
} from "../../services";
import { toast } from "react-toastify";
import { createAnimation } from "../Utils/SkeletonBoardAnimation";
import {
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
  Paper,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Skeleton } from "@material-ui/lab";
import DeleteGameModal from "../App/Home/DeleteGameModal";

const Game = ({ match, history, user, setHideMenu }) => {
  const [board, setBoard] = useState(null);
  const [activePiece, setActivePiece] = useState(null);
  const [totalMoves, setTotalMoves] = useState(0);
  const [turn, setTurn] = useState(1);
  const [lostPieces, setLostPieces] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [player, setPlayer] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [kingCheckStatus, setKingCheckStatus] = useState({
    checked: false,
    player: null,
  });
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
  const [gameMenuEl, setGameMenuEl] = useState(null);
  const [whatIfMode, setWhatIfMode] = useState(false);
  const [flipBoard, setFlipBoard] = useState(false);
  const [showBoardError, setShowBoardError] = useState(false);

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
          history.push(`/game/${match.params.gameID}/results`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error getting game data.");
      });
  };

  //   componentDidMount() {
  //     this.interval = setInterval(() => this.tick(), 1000);
  //   }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  const setUpGameData = async (gameData) => {
    const tempBoard = new Array(64).fill(null);

    if (user.uid === gameData.player1.uid) {
      setPlayer({ uid: user.uid, player: 1 });
    } else if (user.uid === gameData.player2.uid) {
      setPlayer({ uid: user.uid, player: 2 });
    } else {
      history.push("/");
    }

    gameData.board.map((x, i) => {
      if (x !== null) {
        if (x.name === "rook") {
          tempBoard[i] = new rook("rook", x.player);
          tempBoard[i].firstMove = x.firstMove;
        }
        if (x.name === "knight") {
          tempBoard[i] = new knight("knight", x.player);
        }
        if (x.name === "bishop") {
          tempBoard[i] = new bishop("bishop", x.player);
        }
        if (x.name === "king") {
          tempBoard[i] = new king("king", x.player);
          tempBoard[i].firstMove = x.firstMove;
        }
        if (x.name === "queen") {
          tempBoard[i] = new queen("queen", x.player);
        }
        if (x.name === "pawn") {
          tempBoard[i] = new pawn("pawn", x.player);
          tempBoard[i].firstMove = x.firstMove;
        }
      }
    });
    setTurn(gameData.turn);
    setTotalMoves(gameData.totalMoves);

    try {
      if (gameData.player2.uid) {
        let newOpponent = await getUser(gameData.player2.uid);
        setOpponent(newOpponent.data);
      } else {
        setOpponent(null);
      }
    } catch (err) {
      toast.error(
        "Failed to fetch Opponent data. They may have deleted their account."
      );
    }
    setBoard(tempBoard);
  };

  const handleBoardSquareClick = (ID) => {
    if (player.player === turn || whatIfMode) {
      //Set active piece
      if (activePiece === null && board[ID] && board[ID].getPlayer() === turn) {
        console.log("Set Active Piece");
        setCurrentPath(board[ID].getPath(ID, board));
        setActive(true, ID);
      }
      //Unset active piece by clicking it
      else if (activePiece === ID) {
        console.log("Unset active piece");
        setActive(false, ID);
      }
      //Move piece if possible
      else if (
        activePiece !== ID &&
        activePiece !== null &&
        currentPath.includes(ID)
      ) {
        console.log("Move piece if possible");
        movePiece(ID);
      }
      //Unset by clicking out of range
      else if (activePiece) {
        console.log("Move piece if possible");
        setActive(false, ID);
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

  const movePiece = async (moveToID) => {
    animateMove(moveToID, activePiece);
    let tempBoard = board;
    let firstMoveTrackers = ["pawn", "rook", "king"];

    if (tempBoard[activePiece].getName() === "king") {
      if (
        tempBoard[activePiece]
          .getCastlePath(board, activePiece)
          .includes(moveToID)
      ) {
        let rookMove = tempBoard[activePiece].getRookCastleSpot(moveToID);
        tempBoard[rookMove[1]] = tempBoard[rookMove[0]];
        tempBoard[rookMove[0]] = null;
      }
    }

    if (firstMoveTrackers.includes(tempBoard[activePiece].getName())) {
      if (tempBoard[activePiece].isFirstMove())
        tempBoard[activePiece].firstMoveOver();
    }

    if (tempBoard[moveToID]) {
      addToFallen(moveToID);
    }
    tempBoard[moveToID] = tempBoard[activePiece];
    tempBoard[activePiece] = null;
    if (whatIfMode) {
      setBoard(tempBoard);
      updateGame();
      setActive(false);
    } else {
      let gameID = match.params.gameID;
      try {
        await gameUpdate({ gameID, board: tempBoard, totalMoves, turn });
        setBoard(tempBoard);
        updateGame();
      } catch (err) {
        toast.error("We couldn'nt complete your move. Please try again later");
      } finally {
        setActive(false);
      }
    }
    // board.forEach((piece, i) => {
    //   if (piece) isKingChecked(piece, i);
    // });
  };

  const animateMove = (newSpot, oldSpot) => {
    let newRow = Math.floor(newSpot / 8);
    let oldRow = Math.floor(oldSpot / 8);
    let newCol = newSpot % 8;
    let oldCol = oldSpot % 8;
    let animationMove = [oldRow - newRow * 50, oldCol - newCol * 50];
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

  const addToFallen = (piece) => {
    if (board[piece].getName() === "king") {
      gameOver();
    }
    setLostPieces([
      ...lostPieces,
      { player: board[piece].getPlayer(), name: board[piece].getName() },
    ]);
  };

  const gameOver = async () => {
    let gameID = match.params.gameID;
    await setGameOver({ gameID, winner: player.uid });
    history.push(`/game/${gameID}/results`);
  };

  const updateGame = async () => {
    switchTurns();
    setKingCheckStatus({
      checked: false,
      player: null,
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

  const handleMenuClick = (event) => {
    setGameMenuEl(event.currentTarget);
    setShowGameMenu(true);
  };

  const determineTurn = () => {
    return player.player === turn ? user : opponent;
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
    return parseInt(id / 8) % 2
      ? id % 2
        ? "white"
        : "grey"
      : id % 2
      ? "grey"
      : "white";
  };

  const toggleWhatIfMode = () => {
    if (whatIfMode) {
      setWhatIfMode(false);
      setFlipBoard(false);
      setUpGame();
    } else {
      setWhatIfMode(true);
      setTimeout(() => setFlipBoard(true), 500);
    }
    setShowGameMenu(false);
  };

  return (
    <div className="game-container">
      {board ? (
        <div className="chess-area">
          <div className="flex justify-between">
            <DeleteGameModal
              showDeleteGameModal={showDeleteGameModal}
              setShowDeleteGameModal={setShowDeleteGameModal}
              deleteGame={deleteGame}
            />
            <IconButton
              aria-label="exit game"
              className="m-3 ml-4"
              onClick={() => history.push("/")}
            >
              <ArrowBack className="font-xl" />
            </IconButton>
            <IconButton
              id="gameMenu"
              aria-label="game options"
              className="m-3 ml-4"
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={gameMenuEl}
              keepMounted
              open={Boolean(showGameMenu)}
              onClose={() => setShowGameMenu(false)}
            >
              <MenuItem onClick={toggleWhatIfMode}>What If Mode</MenuItem>
              <MenuItem onClick={() => setShowDeleteGameModal(true)}>
                Forfeit Game
              </MenuItem>
              <MenuItem onClick={() => history.push("/")}>Exit</MenuItem>
            </Menu>
          </div>
          {whatIfMode && (
            <div className="text-center flex flex-col justify-center">
              <Typography variant="h5" component="div">
                What If Mode Enabled
              </Typography>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={flipBoard}
                      onChange={() => setFlipBoard(!flipBoard)}
                      color="primary"
                    />
                  }
                  label="Flip board after each turn"
                />
              </div>
            </div>
          )}
          {showBoardError && (
              <Paper className="not-your-turn absolute bg-red-500 p-4">
                It's not your turn yet!
              </Paper>
          )}
          <div
            className={classNames(
              "chess-board transition duration-500 mt-5",
              showBoardError && "board-error",
              player.player === 1 && "flip"
            )}
          >
            {board.map((piece, id) => {
              return (
                <BoardSquare
                  flip={player.player === 1}
                  key={id}
                  piece={piece}
                  color={determineSquareColor(id)}
                  onClick={() => handleBoardSquareClick(id)}
                  active={id === activePiece}
                  path={currentPath ? currentPath.includes(id) : false}
                />
              );
            })}
          </div>
          <GameStatus
            kingCheckStatus={kingCheckStatus}
            user={determineTurn()}
            turn={turn}
            totalMoves={totalMoves}
            player={player}
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
