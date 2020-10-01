import React, { useState, useEffect } from 'react'
import Datepicker from 'react-date-picker'
import config from '../config'
import './MakeBooking.css'
import { Button } from './Button'
import './Button.css'

/**
 * TODO
 * 
 * GET and POST to the DB
 * 
 * STYLEEEE
 * 
 */

const MakeBooking = () => {
    const [date, setDate] = useState(new Date());
    const [datePicked, setDatePicked] = useState()
    const [pickedTime, setPickedTime] = useState(false)
    const [pickedSeat, setPickedSeat] = useState(false)
    const [show, setShow] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const [formValues, setFormValues] = useState({
        date: null,
        time: false,
        seats: 0
    })

    useEffect(() => {
        console.log(date)

    }, [date])

    useEffect(() => {
        console.log('i rendered again')
    }, [pickedTime])

    // Adding 3 months to the current date
    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    const reservations = []

    useEffect(() => {
        // Each time the date changes
        // Send date to db
        // Get available times
        // Add times to the availableTimes state so that we can check if we need to disable the time option or not

        setFormValues(f => ({ ...f, date, time: '' }))


    }, [date])

    // Handler to hopefully handle all the form changes and add them to the form state....... Except the date, I have to update that in useEffect.
    const handleChangeTime = (e) => {
        setFormValues({ ...formValues, time: e.target.value })
        setPickedTime(!pickedTime)
        console.log(formValues.time)
    }

    const handleChangeSeats = (e) => {
        setFormValues({ ...formValues, seats: e.target.value })
        setPickedSeat(true)
        console.log(formValues.seats)
    }

    const handleChange = (e) => {
        console.log('CHAANGE')
    }

    const handleChangeDate = (e) => {
        setDatePicked(e.target.value)
        console.log(datePicked)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        reservations.push(formValues)

        console.log(reservations)
        // Send the info in FormValues to the db to save the booking
    }

    const handleClick = (e) => {
        e.preventDefault()
        setShowForm(true)
    }

    // Get options of seats depending on amount of seats
    let options = []
    for (let i = 1; i <= config.seats; i++) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    // Checking if the time is in the availableTimes array and that the time number is bigger than the current time number.




    return (
        <>
            <div className="form-wrapper">
                <div className="header">
                    <h1>Choose date and time</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Can't figure out how to change the date without calling setDate directly on onChange... */}
                    <div className="date-wrapper">

                        <Datepicker
                            className="picker"
                            onChange={setDate}
                            value={date}
                            maxDate={maxDate}
                            minDate={new Date()}
                            required={true}
                        />
                    </div>
                    <div className="select-outer">
                        <div className="select-inner">
                            <select name="time" id="time" onChange={handleChangeTime} value={formValues.time} required>
                                <option value={''} disabled> - Time - </option>
                                <option value='18.00' >18:00</option>
                                <option value='21.00' >21:00</option>
                            </select>
                        </div>
                        <div className="select-inner">
                            <select name="seats" id="seats" onChange={handleChangeSeats} value={formValues.seats} required>
                                <option value={0} disabled> - Seats - </option>
                                {options}
                            </select>
                        </div>
                    </div>
                    {showForm ?
                        (<>
                            <div className="form-wrapper">
                                <div className="nameWrapper inpWrapper">
                                    <label>First name</label>
                                    <input type="text" onChange={handleChange} name="firstname" placeholder="First Name" required />
                                </div>
                                <div className="nameWrapper inpWrapper">
                                    <label> last name</label>
                                    <input type="text" onChange={handleChange} name="lastname" placeholder="Last Name" required />
                                </div>
                                <div className="emailWrapper inpWrapper">
                                    <label>email</label>
                                    <input type="email" onChange={handleChange} name="email" placeholder="Email" required />
                                </div>
                                <div className="phoneWrapper inpWrapper">
                                    <label>phone</label>
                                    <input type="tel" onChange={handleChange} name="phone" placeholder="Phone number" required />
                                </div>
                                <div className="btn-wrapper">
                                    <Button buttonSize='btn--medium'
                                        buttonColor='black'
                                        onClick={handleClick}>BOOK</Button>
                                </div>
                            </div>
                        </>)

                        : pickedTime && pickedSeat ? (
                            <div className="btn-wrapper">
                                <Button buttonSize='btn--medium'
                                    buttonColor='black'
                                    onClick={handleClick}>Continue</Button>
                            </div>) : <p className="pickInfo">you must choose a date and time to continue</p>
                    }
                </form>
            </div>
        </>
    );
}

export default MakeBooking;