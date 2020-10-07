import React, { useState, useContext } from 'react'
import Calendar from 'react-calendar';
import { config } from '../config';
import './MakeBooking.css'
import { BookingContext } from '../contexts/BookingContext'
import { UpdateContext } from '../contexts/UpdateContext'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import axios from 'axios'


const DatePicker = (props) => {

    const { setHideMsg } = useContext(UpdateContext)

    const { setPickedDate } = useContext(BookingContext)
    const { date, setDate } = useContext(BookingContext)
    const { formValues, setFormValues } = useContext(BookingContext)

    const { availableFirst, setAvailableFirst } = useState()
    const { availableLast, setAvailableLast } = useState()

    const baseApiUrl = 'http://localhost:5000'


    const checkAvailability = async (endpoint, date) => {
        await axios.get(baseApiUrl + endpoint + date)
            .then(response => {
                console.log('response is', response)
                if (response.data.data.avilable_first && response.data.data.avilable_last <= 0) {
                    return false
                }
                else if (response.data.data.avilable_first <= 0) {
                    console.log('fullbokat 18', availableFirst)

                    setAvailableFirst(false)

                }
                else if (response.data.data.avilable_last <= 0) {
                    console.log('fullbokat 21')
                    setAvailableLast(false)
                }
                else {
                    setAvailableLast(true)
                    setAvailableFirst(true)
                    console.log('first', availableFirst, 'last', availableLast)
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    const handleChangeDate = date => {

        setDate(date)
        setHideMsg(true)
        setPickedDate(true)
        const formatDate = moment(date).format('YYYY-MM-DD')
        console.log('date picked is', formatDate)
        checkAvailability('/reservation/', formatDate)
        setFormValues({ ...formValues, date: formatDate })
        console.log('form values', formValues)
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


