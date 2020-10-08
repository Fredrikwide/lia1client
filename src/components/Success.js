import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookingContext } from '../contexts/BookingContext'
import { Button } from './Button'

const Success = () => {
    const navigate = useNavigate()
    const { latestBooking } = useContext(BookingContext)

    return (
        <>
            <div className="header dark">
                <h1>Thank you {latestBooking.firstname} for booking a table</h1>
                <h3>Your reservation info:</h3>
                <p>name: <br /> {latestBooking.firstname} {latestBooking.lastname}</p>
                <p>date: <br /> {latestBooking.date}</p>
                <p>time: <br /> {latestBooking.time}</p>
                <p>people:  <br />{latestBooking.people}</p>

                <h4>to change or cancel your reservation please contact us</h4>
            </div>
            <div className="btn-wrapper">
                <Button buttonColor="black" buttonSize="btn--medium" onClick={() => navigate('/', { replace: true })}>
                    home
            </Button>
            </div>
        </>
    )
}

export default Success
