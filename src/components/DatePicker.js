import React, { useState, useEffect, useContext } from 'react'
import Calendar from 'react-calendar';
import { config } from '../config';
import './MakeBooking.css'
import { DateContext } from '../contexts/DateContext'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import axios from 'axios'

const DatePicker = (props) => {




    const [date, setDate] = useContext(DateContext)

    const [availableFirst, setAvailableFirst] = useContext(DateContext)
    const [availableLast, setAvailableLast] = useContext(DateContext)

    const endpoint = '/reservation'
    const baseApiUrl = 'http://localhost:5000'



    const checkAvailability = async (endpoint, date) => {
        await axios.get(baseApiUrl + endpoint + date)
            .then(response => {
                console.log('response is', response)
                if (response.data.data.avilable_first && response.data.data.avilable_last <= 0) {
                    return false
                }
                else if (response.data.data.avilable_first <= 0) {
                    console.log('fullbokat 18')

                    setAvailableFirst(false)

                }
                else if (response.data.data.avilable_last <= 0) {
                    console.log('fullbokat 21')
                    setAvailableLast(false)
                }
                else console.log('first', availableFirst, 'last', availableLast)
            })
            .catch(error => {
                console.log(error)
            })

    }


    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    const handleChangeDate = date => {
        setDate(date)
        const formatDate = moment(date).format('YYYY-MM-DD')
        console.log('date picked is', formatDate)
        checkAvailability('/reservation/', formatDate)


    }

    return (
        <div className="date-wrapper">
            <Calendar
                onChange={handleChangeDate}
                value={date}
                maxDate={maxDate}
                minDate={new Date()}
            />
        </div>
    )
}

export default DatePicker


//användaren väljer datum

// sätter den valt datum till ett state

//kolla mot DB om datum är upptaget

//om true visa komponent

//om false rendera välj tid och antal


