import { makeStyles } from '@material-ui/styles'

const BOARD_SIDE_MARGIN = 15;

export const useStyles = makeStyles<any, {
    numSquaresPerSide: number,
}>(theme => ({
    root: ({ numSquaresPerSide }) => ({
        display: 'grid',
        gridArea: 'main',
        maxHeight: 'calc(100vw - 30px)',
        margin: BOARD_SIDE_MARGIN,
        marginBottom: 10,
        marginTop: 10,
        overflow: 'auto',
        gridTemplateRows: `repeat(${numSquaresPerSide}, minmax(calc((100vw - ${BOARD_SIDE_MARGIN * 2}px) / ${numSquaresPerSide}), 1fr))`,
        gridTemplateColumns: `repeat(${numSquaresPerSide}, 1fr)`,
        backgroundColor: 'rgba(255, 233, 154, 0.91)',
    }),
}));
