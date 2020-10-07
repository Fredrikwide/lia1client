import React from 'react';
import { render } from 'react-dom';
import { UpdateProvider } from './contexts/UpdateContext'
import { BookingProvider } from './contexts/BookingContext'
import { UserProvider } from './contexts/UserContext';
import './App.scss';
import App from './App';

render(
  <UserProvider >
    <BookingProvider>
      <UpdateProvider>
        <App />
      </UpdateProvider>
    </BookingProvider>
  </UserProvider>,
  document.getElementById('root')
);

