import React from 'react';
import ReactDOM from 'react-dom';
import { DateProvider } from './contexts/DateContext'

import App from './App';

ReactDOM.render(
  <DateProvider>
    <App />
  </DateProvider>,
  document.getElementById('root')
);

