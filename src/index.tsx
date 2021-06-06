import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/react';
import App from './App';

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
