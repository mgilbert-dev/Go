import { selector, atom } from 'recoil';
import { boardSelector, getNumSquares, historyAtom } from '~state/board';
import { SpecialValues } from '~engine/constants';
import { getWinner, findLegalMoves } from '~engine/board';
import { Color, Piece, WorkerInterface } from '~engine/types';
import { GameState } from './types';
import { wrap } from 'comlink';

const engineWorker = wrap<WorkerInterface>(
    new Worker('../../engine/engine.worker.ts')
);
  
const getCurrentTurn = (board: string): Color => {
    return board[getNumSquares(board) + SpecialValues.CurrentTurn] === Color.White ?
        Color.Black :
        Color.White;
};

export const currentTurnSelector = selector({
    key: 'currentTurn',
    get: ({ get }) => getCurrentTurn(get(boardSelector))
});

export const legalMovesSelector = selector({
    key: 'legalMoves',
    get: async ({ get }) => {
        const latestBoard = get(boardSelector);
        const history = get(historyAtom);
        return engineWorker.getValidMoves(latestBoard, history);
    },
});

export const turnsElapsedSelector = selector({
    key: 'turnsElapsed',
    get: ({ get }) => get(historyAtom).length - 1,
});

export const lastMoveSelector = selector({
    key: 'lastMove',
    get: ({ get }) => {
        const boardHistory = get(historyAtom);
        const lastBoard = boardHistory[boardHistory.length - 1];
        const lastLastBoard = boardHistory[boardHistory.length - 2];
        let lastMove: number = null;
        if (lastLastBoard) {
          lastBoard.split('').forEach((square, idx) => {
            if (lastLastBoard[idx] === Piece.Empty && square !== Piece.Empty) {
              lastMove = idx;
            }
          });
        }
        return lastMove;
    },
});

export const gameStateSelector = selector({
    key: 'gameState',
    get: ({ get }) => {
        const boardHistory = get(historyAtom);
        const lastBoard = boardHistory[boardHistory.length - 1];
        const lastLastBoard = boardHistory[boardHistory.length - 2];
        const lastLastLastBoard = boardHistory[boardHistory.length - 3];
        
        let lastMove: number = null;
        let lastLastMove: number = null;
        if (lastLastBoard) {
          lastBoard.split('').forEach((square, idx) => {
            if (lastLastBoard[idx] === Piece.Empty && square !== Piece.Empty) {
              lastMove = idx;
            }
          });
        }
        if (lastLastLastBoard) {
            lastLastBoard.split('').forEach((square, idx) => {
                if (lastLastLastBoard[idx] === Piece.Empty && square !== Piece.Empty) {
                    lastLastMove = idx;
                }
            });
        }

        if (boardHistory.length > 2 && lastMove === null && lastLastMove === null) return GameState.Over;
        if (boardHistory.length > 1 && lastMove === null) return GameState.Passed;
        return GameState.InProgress;
    },
});

export const endStateSelector = selector({
    key: 'endState',
    get: ({ get }) => {
        const gameStateValue = get(gameStateSelector);
        const boardValue = get(boardSelector);
        if (gameStateValue === GameState.Over) {
            return getWinner(boardValue);
        }
        return null;
    },
});

export const goIdAtom = atom<string>({
    key: 'goId',
    default: null,
});

export const goRoomAtom = atom<string>({
    key: 'goRoom',
    default: null,
});

export const userColorAtom = atom({
    key: 'userColor',
    default: Color.None,
});
