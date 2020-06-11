import React, { FC } from 'react';
import Board from '~components/Board';
import Settings from '~components/Settings';
import { useStyles } from './style';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Board/>
      <Settings/>
    </div>
  );
};

export default App;
