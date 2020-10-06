import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { DateProvider } from './contexts/DateContext'
import { TimeProvider } from './contexts/TimeContext'
import { FormProvider } from './contexts/FormContext'
import { UpdateProvider } from './contexts/UpdateContext'
import { BookingProvider } from './contexts/BookingContext'
import { UserProvider } from './contexts/UserContext';

import App from './App';

render(
  <UserProvider >
    <DateProvider>
      <FormProvider>
        <BookingProvider>
          <TimeProvider>
            <UpdateProvider>
              <App />
            </UpdateProvider>
          </TimeProvider>
        </BookingProvider>
      </FormProvider>
    </DateProvider>
  </UserProvider>,
  document.getElementById('root')
);

