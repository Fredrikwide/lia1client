import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookingContext } from '../contexts/BookingContext'
import { UpdateContext } from '../contexts/UpdateContext'
import { Button } from './Button'
import "./Success.scss"


const Success = () => {
    const navigate = useNavigate()
    const { latestBooking } = useContext(BookingContext)
    const { pageReset, setPageReset } = useContext(UpdateContext)

    const handleBackHome = () => {
        setPageReset(!pageReset)
        navigate('/lia1client')
    }

    return (
        <>
            <div className="success-info">
                <h1>Thank you {latestBooking.firstname} for booking a table</h1>
                <h3>Your reservation info:</h3>
                <div className="booking-info">
                    <p>{latestBooking.firstname} {latestBooking.lastname}</p>
                    <p>{latestBooking.phone}</p>
                    <p>{latestBooking.email}</p>
                    <p>{latestBooking.date}</p>
                    <p>{latestBooking.time}</p>
                    <p>{latestBooking.people} people</p>
                </div>

                <h4>to change or cancel your reservation please contact us</h4>
            </div>
            <div className="btn-wrapper">
                <Button buttonColor="black" buttonSize="btn--medium" onClick={handleBackHome}>
                    home
            </Button>
            </div>
        </>
    )
}

export default Success
