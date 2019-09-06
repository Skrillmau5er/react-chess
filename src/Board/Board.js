// Board Piece Classes
import queen from '../Pieces/queen';
import rook from '../Pieces/rook';
import bishop from '../Pieces/bishop';
import knight from '../Pieces/knight';
import pawn from '../Pieces/pawn';
import king from '../Pieces/king';

const boardSetUp =
  [
    {
      color: 'grey',
      pieceID: 1,
      piece: new rook('rook',1),
    },
    {
      color: 'white',
      pieceID: 2,
      piece: new knight('knight',1),
    },
    {
      color: 'grey',
      pieceID: 3,
      piece: new bishop('bishop',1),
    },
    {
      color: 'white',
      pieceID: 4,
      piece: new king('king',1),
    },
    {
      color: 'grey',
      pieceID: 5,
      piece: new queen('queen',1),
    },
    {
      color: 'white',
      pieceID: 6,
      piece: new bishop('bishop',1),
    },
    {
      color: 'grey',
      pieceID: 7,
      piece: new knight('knight',1),
    },
    {
      color: 'white',
      pieceID: 8,
      piece: new rook('rook',1),
    },
    {
      color: 'white',
      pieceID: 9,
      piece: new pawn('pawn',1),
    },
    {
      color: 'grey',
      pieceID: 10,
      piece: new pawn('pawn',1),
    },
    {
      color: 'white',
      pieceID: 11,
      piece: new pawn('pawn',1),
    },
    {
      color: 'grey',
      pieceID: 12,
      piece: new pawn('pawn',1),
    },
    {
      color: 'white',
      pieceID: 13,
      piece: new pawn('pawn',1),
    },
    {
      color: 'grey',
      pieceID: 14,
      piece: new pawn('pawn',1),
    },
    {
      color: 'white',
      pieceID: 15,
      piece: new pawn('pawn',1),
    },
    {
      color: 'grey',
      pieceID: 16,
      piece: new pawn('pawn',1),
    },
    {
      color: 'grey',
      pieceID: 17,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 18,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 19,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 20,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 21,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 22,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 23,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 24,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 25,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 26,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 27,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 28,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 29,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 30,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 31,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 32,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 33,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 34,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 35,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 36,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 37,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 38,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 39,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 40,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 41,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 42,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 43,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 44,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 45,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 46,
      piece: null,
    },
    {
      color: 'white',
      pieceID: 47,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 48,
      piece: null,
    },
    {
      color: 'grey',
      pieceID: 49,
      piece: new pawn('pawn',2),
    },
    {
      color: 'white',
      pieceID: 50,
      piece: new pawn('pawn',2),
    },
    {
      color: 'grey',
      pieceID: 51,
      piece: new pawn('pawn',2),
    },
    {
      color: 'white',
      pieceID: 52,
      piece: new pawn('pawn',2),
    },
    {
      color: 'grey',
      pieceID: 53,
      piece: new pawn('pawn',2),
    },
    {
      color: 'white',
      pieceID: 54,
      piece: new pawn('pawn',2),
    },
    {
      color: 'grey',
      pieceID: 55,
      piece: new pawn('pawn',2),
    },
    {
      color: 'white',
      pieceID: 56,
      piece: new pawn('pawn',2),
    },
    {
      color: 'white',
      pieceID: 57,
      piece: new rook('rook',2),
    },
    {
      color: 'grey',
      pieceID: 58,
      piece: new knight('knight',2),
    },
    {
      color: 'white',
      pieceID: 59,
      piece: new bishop('bishop',2),
    },
    {
      color: 'grey',
      pieceID: 60,
      piece: new king('king',2),
    },
    {
      color: 'white',
      pieceID: 61,
      piece: new queen('queen',2),
    },
    {
      color: 'grey',
      pieceID: 62,
      piece: new bishop('bishop',2),
    },
    {
      color: 'white',
      pieceID: 63,
      piece: new knight('knight',2),
    },
    {
      color: 'grey',
      pieceID: 64,
      piece: new rook('rook',2),
    }
  ];

export default boardSetUp;