import { makeStyles } from '@material-ui/styles'

const BOARD_SIDE_MARGIN = 15;

export const useStyles = makeStyles<any, {
    numSquaresPerSide: number,
}>(theme => ({
    root: ({ numSquaresPerSide }) => ({
        display: 'grid',
        gridArea: 'main',
        margin: 0,
        overflow: 'auto',
        gridTemplateRows: `repeat(${numSquaresPerSide}, min(calc(100vh / ${numSquaresPerSide}), calc(100vw / ${numSquaresPerSide})))`,
        gridTemplateColumns: `repeat(${numSquaresPerSide}, min(calc(100vh / ${numSquaresPerSide}), calc(100vw / ${numSquaresPerSide})))`,
        backgroundColor: 'rgba(255, 233, 154, 0.91)',
    }),
}));
