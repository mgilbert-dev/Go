import React, { FC } from 'react';
import { useStyles } from './style';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { initialBoardSelector, historyAtom } from '~state/board';
import { getNumSquares } from '~engine/board';
import { INITIAL_BOARD_LARGE, INITIAL_BOARD_MEDIUM, INITIAL_BOARD_SMALL } from '~engine/constants';

export interface SettingsProps {
    
}

export const Settings: FC<SettingsProps> = () => {
    const classes = useStyles({});
    const [initialBoard, setInitialBoard] = useRecoilState(initialBoardSelector);
    const setHistory = useSetRecoilState(historyAtom);
    const numSquares = getNumSquares(initialBoard);
    const numSquaresPerSide = Math.sqrt(numSquares);

    const handleSelectDimensions = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case '9X9':
                setInitialBoard(INITIAL_BOARD_SMALL);
                break;
            case '13X13':
                setInitialBoard(INITIAL_BOARD_MEDIUM);
                break;
            case '19X19':
                setInitialBoard(INITIAL_BOARD_LARGE);
                break;
            default:
                break;
        }
    };

    const handleClickUndo = () => {
        setHistory(prev => prev.length > 1 ? prev.slice(0, prev.length - 1) : prev);
    };

    return (
        <div className={classes.root}>
            <select
                className={classes.boardSize}
                value={`${numSquaresPerSide}X${numSquaresPerSide}`}
                onChange={handleSelectDimensions}
            >
                <option>9X9</option>
                <option>13X13</option>
                <option>19X19</option>
            </select>
            <button
                className={classes.undo}
                onClick={handleClickUndo}
            >
                Undo
            </button>
        </div>
    );
};

export default Settings;
