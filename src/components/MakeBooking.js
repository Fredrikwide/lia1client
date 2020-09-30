import React, { useState, useEffect } from 'react'
import Datepicker from 'react-date-picker'
import config from '../config'
import './MakeBooking.css'

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
    const [showForm, setShowForm] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const [formValues, setFormValues] = useState({
        date: null,
        time: '',
        seats: 0
    })

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

        let random = Math.floor(Math.random() * 30)

        if (random >= 30) {
            setAvailableTimes([])
        } else {
            let random = Math.floor(Math.random() * 3)
            if (random === 1) {
                setAvailableTimes([18, 21])
            } else if (random === 2) {
                setAvailableTimes([18])
            } else if (random === 3) {
                setAvailableTimes([21])
            }
        }
    }, [date])

    // Handler to hopefully handle all the form changes and add them to the form state....... Except the date, I have to update that in useEffect.
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
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
    const checkTime = (time) => availableTimes.includes(time) && (new Date().getHours() < time)




    return (
        <>
            <div className="form-wrapper">
                <p>Choose date and time</p>
                <form onSubmit={handleSubmit}>
                    {/* Can't figure out how to change the date without calling setDate directly on onChange... */}
                    <div className="date-wrapper">
                        <Datepicker
                            onChange={setDate}
                            value={date}
                            maxDate={maxDate}
                            minDate={new Date()}
                            required={true}
                        />
                    </div>

                    <select name="time" id="time" onChange={handleChange} value={formValues.time} required>
                        <option value={''} disabled> - Time - </option>
                        <option value='18' disabled={checkTime(18) ? null : 'disabled'}>18:00</option>
                        <option value='21' disabled={checkTime(21) ? null : 'disabled'}>21:00</option>
                    </select>

                    <select name="seats" id="seats" onChange={handleChange} value={formValues.seats} required>
                        <option value={0} disabled> - Seats - </option>
                        {options}
                    </select>

                    {showForm ?
                        (<>
                            <div className="nameInpWrapper inpWrapper">
                                <label>name</label>
                                <input type="text" onChange={handleChange} name="name" placeholder="Name" required />
                            </div>
                            <div className="emailInpWrapper inpWrapper">
                                <label>email</label>
                                <input type="email" onChange={handleChange} name="email" placeholder="Email" required />
                            </div>
                            <div className="phoneInpWrapper inpWrapper">
                                <label>phone</label>
                                <input type="tel" onChange={handleChange} name="phone" placeholder="Phone number" required />
                            </div>
                            <div className="btn-wrapper">
                                <button type="submit">Book</button>
                            </div>
                        </>)
                        : (<button onClick={handleClick}>Continue</button>)}
                </form>
            </div>
        </>
    );
}

export default MakeBooking;