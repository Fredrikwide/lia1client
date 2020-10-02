import React, { useState, useEffect } from 'react'

import { config } from '../config'
import axios from 'axios'
import ShowBooking from './ShowBooking'
import './MakeBooking.css'
import { Button } from './Button'
import './Button.css'
import 'react-calendar/dist/Calendar.css';
import DatePicker from './DatePicker';
/**
 * TODO
 * 
 * GET and POST to the DB
 * 
 * STYLEEEE
 * 
 */

const MakeBooking = () => {







    // Adding 3 months to the current date
    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    const reservations = []

    // useEffect(() => {
    //     // Each time the date changes
    //     // Send date to db
    //     // Get available times
    //     // Add times to the availableTimes state so that we can check if we need to disable the time option or not

    //     setFormValues(f => ({ ...f, date, time: '' }))


    // }, [date])

    // Handler to hopefully handle all the form changes and add them to the form state....... Except the date, I have to update that in useEffect.









    return (
        <> {

            //kollar om bokning är gjord eller inte för att dölja formuläret om bokning är gjord

            !bookingMade

                ?

                <div className="form-wrapper">
                    <div className="header">
                        <h1>Choose date and time</h1>
                    </div>
                    <form onSubmit={handleSubmit}>

                        {
                            //kollar om tid och antal personer är valda  
                            showForm
                                ?
                                (<>
                                    <div className="form-wrapper">
                                        <div className="nameWrapper inpWrapper">
                                            <label>First name</label>
                                            <input type="text" onChange={handleChangefirstName} name="firstname" placeholder="First Name" required />
                                        </div>
                                        <div className="nameWrapper inpWrapper">
                                            <label> last name</label>
                                            <input type="text" onChange={handleChangelastName} name="lastname" placeholder="Last Name" required />
                                        </div>
                                        <div className="emailWrapper inpWrapper">
                                            <label>email</label>
                                            <input type="email" onChange={handleChangeEmail} name="email" placeholder="Email" required />
                                        </div>
                                        <div className="phoneWrapper inpWrapper">
                                            <label>phone</label>
                                            <input type="tel" onChange={handleChangePhone} name="phone" placeholder="Phone number" required />
                                        </div>
                                        <div className="btn-wrapper">
                                            <Button
                                                type='submit'
                                                buttonSize='btn--medium'
                                                buttonColor='black'
                                            >BOOK</Button>
                                        </div>
                                    </div>
                                </>)

                                : pickedTime && pickedSeat ? (
                                    <div className="btn-wrapper">
                                        <Button buttonSize='btn--medium'
                                            buttonColor='black'
                                            onClick={handleClick}>Continue</Button>
                                    </div>)
                                    :
                                    <p className="pickInfo">you must choose a date and time to continue</p>
                        }
                    </form>
                </div>

                :

                <ShowBooking booking={{ ...formValues }} />}
        </>
    );
}

export default MakeBooking;