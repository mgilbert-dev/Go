import './style.scss';
import React from 'react';
import { render } from 'react-dom';
import { App } from '~components/App';
import {
  RecoilRoot,
} from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

render(
  <BrowserRouter>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept()
}
