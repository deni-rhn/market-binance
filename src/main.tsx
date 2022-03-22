import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes';
import 'rc-pagination/assets/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root'),
);
