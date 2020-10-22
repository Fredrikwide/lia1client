import React, { useContext, useEffect } from 'react'
import Calendar from 'react-calendar';
import { config } from '../config';
import './MakeBooking.css'
import { BookingContext } from '../contexts/BookingContext'
import { UpdateContext } from '../contexts/UpdateContext'
import { getReservationByDate } from '../services/fetch'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'




const DatePicker = () => {

    const { setHideMsg } = useContext(UpdateContext)
    const { setPickedDate } = useContext(BookingContext)
    const { date, setDate } = useContext(BookingContext)
    const { formValues, setFormValues } = useContext(BookingContext)
    const { setFullyBooked } = useContext(BookingContext)
    const { setFullyBooked18 } = useContext(BookingContext)
    const { setFullyBooked21 } = useContext(BookingContext)






    useEffect(() => {

        const checkAvailability = async () => {
            const checkingRes = await getReservationByDate(moment(date).format('YYYY-MM-DD'))

            if (checkingRes.data.data.first < 1 && checkingRes.data.data.last < 1) {

                setFullyBooked(true)
            }
            else if (checkingRes.data.data.first < 1) {

                setFullyBooked21(true)
            }
            else if (checkingRes.data.data.last < 1) {

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

        setFormValues({ ...formValues, date: formatDate })
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


