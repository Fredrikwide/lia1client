import React from 'react'
import { Link } from 'react-router-dom'

const ShowBooking = (props) => {
    return (
        <>
            <h2>Thank you for booking a table</h2>
            <p>Here is your booking info</p>
            <div className="info-container">
                <p>hihihi</p>
                <Link to="/" ><button>back</button></Link>
            </div>
        </>
    )
}

export default ShowBooking
