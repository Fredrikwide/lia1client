import React, { useState, useContext, useEffect } from 'react'
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
    const { setFullyBooked } = useContext(BookingContext)
    const { setFullyBooked18 } = useContext(BookingContext)
    const { setFullyBooked21 } = useContext(BookingContext)

    const baseApiUrl = 'http://localhost:5000'

    useEffect(() => {

        const checkAvailability = async () => {
            const checkingRes = await axios.get(`${baseApiUrl}/reservation/${moment(date).format('YYYY-MM-DD')}`)
            console.log(checkingRes)
            if (checkingRes.data.data.avilable_21 < 1 && checkingRes.data.data.avilable_18 < 1) {
                setFullyBooked(true)
            }
            else if (checkingRes.data.data.avilable_21 < 1) {
                console.log('im booked 21')
                setFullyBooked21(true)
            }
            else if (checkingRes.data.data.avilable_18 < 1) {
                console.log('im booked 18')
                setFullyBooked18(true)
            }
            else {
                setFullyBooked(false)
                setFullyBooked21(false)
                setFullyBooked18(false)
            }
        }
        checkAvailability()
    }, [date])


    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    const handleChangeDate = date => {

        setDate(date)
        setHideMsg(true)
        setPickedDate(true)
        const formatDate = moment(date).format('YYYY-MM-DD')
        console.log('date picked is', formatDate)

        setFormValues({ ...formValues, date: formatDate })
        console.log('form values', formValues)
    }

    return (
        <div className="date-wrapper">
            <h1>Thank you for dining with us!</h1>
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


