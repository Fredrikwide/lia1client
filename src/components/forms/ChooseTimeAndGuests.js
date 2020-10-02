import React, { useState, useContext } from 'react'
import { DateContext } from '../../contexts/DateContext'
import { config } from '../../config/index'
import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'


const ChooseTimeAndGuests = () => {



    const [formValues, setFormValues] = useContext(DateContext)
    const [pickedTime, setPickedTime] = useContext(DateContext)
    const [pickedSeat, setPickedSeat] = useContext(DateContext)
    const [showForm, setShowForm] = useContext(DateContext)

    let options = []
    for (let i = 1; i <= config.seats; i++) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    const handleChangeTime = (e) => {
        setFormValues({ ...formValues, time: e.target.value })
        setPickedTime(pickedTime)
        console.log(formValues)
    }

    const handleChangeSeats = (e) => {
        setFormValues({ ...formValues, seats: e.target.value })
        setPickedSeat(pickedSeat)
        console.log(formValues)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setShowForm(true)
    }


    return (
        <>
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
            { pickedTime && pickedSeat ? (
                <div className="btn-wrapper">
                    <Button buttonSize='btn--medium'
                        buttonColor='black'
                        onClick={handleClick}>Continue</Button>
                </div>)
                :
                <p className="pickInfo">you must choose a date and time to continue</p>
            }
        </>
    )
}

export default ChooseTimeAndGuests
