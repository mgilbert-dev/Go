import React, { FC, useEffect, useCallback, useState } from 'react';
import { useStyles } from './style';
import Square from '~components/Square';
import { getNumSquares, makeMove, findLegalMoves } from '~engine/board';
import { SpecialValues } from '~engine/constants';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
    lastMoveSelector,
    endStateSelector,
    goRoomAtom,
} from '~state/game';
import { boardSelector, historyAtom } from '~state/board';

export interface BoardProps {
    
}

export const Board: FC<BoardProps> = () => {
    const board = useRecoilValue(boardSelector);
    const [history, setHistory] = useRecoilState(historyAtom);
    const [legalMoves, setLegalMoves] = useState([]);
    const lastMove = useRecoilValue(lastMoveSelector);
    const endState = useRecoilValue(endStateSelector);
    const goRoom = useRecoilValue(goRoomAtom);
    const zones = endState?.zones ?? {};

    const numSquares = getNumSquares(board);
    const numSquaresPerSide = Math.sqrt(numSquares);
    const classes = useStyles({ numSquaresPerSide });

    //Will be needed to set up AI
    const lastMoved = board[getNumSquares(board) + SpecialValues.CurrentTurn];
    const canMove = true;

    const handleClickSquare = useCallback((pos: number) => {
        setHistory(prev => {
            const lastBoard = prev[prev.length - 1];
            const nextBoard = makeMove(lastBoard, pos);
            return prev.concat(nextBoard);
        });
    }, [setHistory]);

    useEffect(() => {
        if (!goRoom && !canMove) {
            // dispatch(makeAIMove());
        }
    }, [canMove, goRoom]);

    useEffect(() => {
        setLegalMoves(findLegalMoves(board, history));
    }, [board, history]);

    return (
        <div className={classes.root}>
            {board.slice(0, numSquares).split('')
                .map((square, idx) => {
                    return (
                        <Square
                            key={`${idx}-${numSquaresPerSide}-square`}
                            square={square}
                            pos={idx}
                            onClick={handleClickSquare}
                            disabled={!canMove || !legalMoves.includes(idx)}
                            wasLastMove={lastMove === idx}
                            zone={zones[idx]}
                            numSquaresPerSide={numSquaresPerSide}
                        />
                    );
                })
            }
        </div>
    );
};

export default Board;
