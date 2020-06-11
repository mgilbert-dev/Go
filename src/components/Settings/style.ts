import { makeStyles } from '@material-ui/styles'
import { Theme } from '~theme';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'grid',
        gridTemplateAreas: `"board-size undo"`,
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 1fr',
        height: 60,
    },
    boardSize: {
        gridArea: 'board-size',
        display: 'flex',
        fontSize: 24,
        fontWeight: 600,
        fontFamily: 'Oxanium',
        textAlign: 'center',
    },
    undo: {
        gridArea: 'undo',
        ...theme.presets.centered,
        fontSize: 24,
        fontWeight: 600,
        fontFamily: 'Oxanium',
    },
}));
