import React, { useContext } from 'react'
import { UpdateContext } from '../../contexts/UpdateContext'

export const BookingList = (props) => {

    const { hideCal, setHideCal, dispSingleBooking, setDispSingleBooking, setCurrBooking } = useContext(UpdateContext)

    const handleEdit = (data) => {
        setHideCal(!hideCal)
        setDispSingleBooking(!dispSingleBooking)
        setCurrBooking(data)
    }

    return (
        <>
            <div onClick={() => handleEdit(booking)} className="inner">
                <div className="item-box">
                    <ul>
                        {
                            props.booking.map((booking, index) => (

                                <li key={index}><strong>{booking.firstname} {booking.lastname}</strong>  | {booking.time}  | people   {booking.people} | {booking.email} </li>

                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
