import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookingContext } from '../../contexts/BookingContext'
import { UpdateContext } from '../../contexts/UpdateContext'

import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'

import Axios from 'axios'

const BookingForm = () => {


    const navigate = useNavigate()
    const { formValues,
        setFormValues,
        setLatestBooking,
        pickedDate,
        setPickedDate,
    }
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
    const [errorMsg, setErrorMsg] = useState('')



    const postBooking = async (data) => {
        const bookingRes = await Axios.post(`http://localhost:5000/reservation`, data)
        console.log('res is ', bookingRes)
        if (bookingRes.status === 'fail') {
            console.log(bookingRes.data.message)
            setErrorMsg(bookingRes.data.message)
            setSorry(true)
        }
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

    const handleGDPR = () => {
        setCheckGDPR(!checkGDPR)
        setFormValues({ ...formValues, gdpr: !checkGDPR })
    }

    const clearValues = () => {
        setIsClicked(!isClicked)
        setIsHidden(!isHidden)
        setHideMsg(!hideMsg)
        setPageReset(!pageReset)
        setPickedDate(!pickedDate)
        setFormValues({
            date: null,
            time: null,
            people: 0,
            gdpr: false
        })
    }

    const handleCancelBooking = () => {
        navigate('/book')
        clearValues()
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        setSorry(false)
        postBooking(formValues)
        setLatestBooking(formValues)
        clearValues()
        navigate('/success')

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
                    <p> date: {formValues.date} at {formValues.time} o'clock for {formValues.people} people</p>
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
                                    onChange={handleGDPR}
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
                                            buttonColor='green'
                                        >Confirm
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
                                    <h2>{errorMsg}</h2>
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
