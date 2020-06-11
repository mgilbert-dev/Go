import { atom, selector, DefaultValue } from 'recoil';
import { INITIAL_BOARD_SMALL } from '~engine/constants';

export const getNumSquares = (board: string): number => {
    return board.search(/[WB]/);
};

export const historyAtom = atom({
    key: 'history',
    default: [INITIAL_BOARD_SMALL],
});

export const initialBoardSelector = selector<string>({
    key: 'initialBoard',
    get: ({ get }) => get(historyAtom)[0],
    set: ({ set }, newValue) => set(historyAtom,
        newValue instanceof DefaultValue ? newValue :  [newValue],
    )
});

export const boardSelector = selector({
    key: 'board',
    get: ({ get }) => {
        const boardHistory = get(historyAtom);
        return boardHistory[boardHistory.length - 1];
    },
});
