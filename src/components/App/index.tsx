import React, { FC } from 'react';
import Board from '~components/Board';
import { useStyles } from './style';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Board/>
    </div>
  );
};

export default App;
