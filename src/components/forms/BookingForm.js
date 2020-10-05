import React, { useContext, useState, useEffect } from 'react'
import { DateContext } from '../../contexts/DateContext'
import { BookingContext } from '../../contexts/BookingContext'
import { FormContext } from '../../contexts/FormContext'
import { createBooking } from '../routes/fetch'
import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'

const BookingForm = () => {

    const { bookingMade, setBookingMade } = useContext(BookingContext)
    const { formValues, setFormValues } = useContext(FormContext)

    const [firstName, setFirstName] = useState(false)
    const [lastName, setLastName] = useState(false)
    const [email, setEmail] = useState(false)
    const [phone, setPhone] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')




    const reservations = []

    const handleChangefirstName = (e) => {
        setFormValues({ ...formValues, firstname: e.target.value })
    }

    const handleChangelastName = (e) => {
        setFormValues({ ...formValues, lastname: e.target.value })
    }

    const handleChangeEmail = (e) => {
        setFormValues({ ...formValues, email: e.target.value })
    }

    const handleChangePhone = (e) => {
        setFormValues({ ...formValues, phone: e.target.value })
    }

    // const checkValues = (firstName, lastName, email, phone) => {
    //     if(!firstName) {
    //         setDisableSubmit(true)

    //     }
    //     else return true
    // }



    const handleSubmit = (e) => {
        e.preventDefault()
        createBooking('/reservation', formValues)
        setBookingMade(true)
        reservations.push(formValues)
        console.log('booking made', formValues, 'reservations', reservations)

        // Send the info in FormValues to the db to save the booking
    }




    return (
        <>
            <div className="form-wrapper">
                <div className="header">
                    <h1>Fill in the form to make your reservation!</h1>
                </div>
                <form onSubmit={handleSubmit}>
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
                            {!disableSubmit ?
                                <Button
                                    type='submit'
                                    buttonSize='btn--medium'
                                    buttonColor='black'
                                >BOOK
                            </Button>
                                : <p>{errorMsg}</p>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BookingForm
