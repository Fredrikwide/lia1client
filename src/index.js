import React from 'react';
import { render } from 'react-dom';
import { DateProvider } from './contexts/DateContext'
import { TimeProvider } from './contexts/TimeContext'
import { FormProvider } from './contexts/FormContext'
import { UpdateProvider } from './contexts/UpdateContext'
import { BookingProvider } from './contexts/BookingContext'

import App from './App';

render(
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
  </DateProvider>,
  document.getElementById('root')
);

