import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookingContext } from '../../contexts/BookingContext'
import { UpdateContext } from '../../contexts/UpdateContext'

import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'
import moment from 'moment'
import Axios from 'axios'

const BookingForm = () => {

    const navigate = useNavigate()

    const { formValues,
        setFormValues,
        setLatestBooking,
        pickedDate,
        setPickedDate,
        setFullyBooked,
        fullyBooked,
        setFullyBooked18,
        fullyBooked18,
        setFullyBooked21,
        fullyBooked21 }
        = useContext(BookingContext)

    const { isClicked,
        setIsClicked,
        isHidden,
        setIsHidden,
        hideMsg,
        setHideMsg,
        pageReset,
        setPageReset }
        = useContext(UpdateContext)

    const [checkGDPR, setCheckGDPR] = useState(false)
    const [sorry, setSorry] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const baseApiUrl = 'http://localhost:5000'

    const postBooking = async (data) => {
        const bookingRes = await Axios.post(`${baseApiUrl}/reservation`, data)
        console.log('SUCCESS')
        console.log('res is ', bookingRes)
    }


    // useEffect(() => {
    //     console.log('I RAN IN BOOKING')
    //     const checkAvailability = async () => {
    //         const checkingRes = await Axios.get(`${baseApiUrl}/reservation/${formValues.date}/${formValues.time}`)
    //         console.log(checkingRes)
    //         if (checkingRes.data.data.available) {
    //             setSorry(false)
    //         }
    //         else setSorry(true)
    //     }
    //     checkAvailability()

    // }, [])



    const checkBooking = () => {
        const checkAvailability = async () => {
            const checkingRes = await Axios.get(`${baseApiUrl}/reservation/${formValues.date}/${formValues.time}`)
            console.log(checkingRes)
            if (!checkingRes.data.data.avilable) {
                setSorry(true)
                return
            }
            else if (checkingRes.data.data.avilable) {
                console.log('im in else if')
                setCheckGDPR(true)
                setSorry(false)
                setFormValues({ ...formValues, gdpr: checkGDPR })
                postBooking(formValues)
                setLatestBooking(formValues)
                clearValues()
            }
            else {
                console.log('helllo im done')
            }
        }
        checkAvailability()
    }




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

    const clearValues = () => {
        setIsClicked(!isClicked)
        setIsHidden(!isHidden)
        setHideMsg(!hideMsg)
        setPageReset(!pageReset)
        setPickedDate(!pickedDate)
    }

    const handleCancelBooking = () => {
        navigate('/book')
        clearValues()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        checkBooking()


        // Send the info in FormValues to the db to save the booking
    }





    return (
        <>
            <div className="form-wrapper">
                <div className="header">
                    <h2 className="form-header-text"> Fill in the form to make your reservation!</h2>
                </div>
                <div className="">
                    <h3>
                        your reservation:
                            </h3>
                    <p> date: {formValues.date} at {formValues.time} o'clock for {formValues.seats} people</p>
                </div>
                <form onSubmit={handleSubmit} >
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
                            <input type="tel" minLength="10" maxLength="12" onChange={handleChangePhone} name="phone" placeholder="Phone number" required />

                        </div>
                        <div>
                            <div className="checkGDPR">
                                <input
                                    type="checkbox"
                                    className="checkBox"
                                    value={checkGDPR}

                                    required
                                />
                                <p className="pickInfo gdprText">I agree that my information is handled according to <Link to="/privacy" >our privacy policy</Link></p>
                            </div>
                        </div>
                        <div className="btn-outer">
                            {!sorry ?
                                <>

                                    <div className="btn-wrapper">
                                        <Button
                                            buttonType="submit"
                                            buttonSize='btn--medium'
                                            buttonColor='black'
                                        >BOOK
                            </Button>
                                    </div>

                                    <div className="btn-wrapper">
                                        <Button
                                            buttonType='click'
                                            buttonSize='btn--medium'
                                            buttonColor='red'
                                            onClick={handleCancelBooking}
                                        >Cancel
                                </Button>
                                    </div>
                                </>
                                : <div>
                                    <h2>SORRY DUDE, THIS TIME HAS JUST BEEN BOOKED</h2>
                                </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BookingForm
