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
            {
                props.booking.map((booking, index) => (
                    <div key={index} onClick={() => handleEdit(booking)} className="inner">
                        <div className="item-box">
                            <ul>
                                <li><strong>{booking.firstname} {booking.lastname}</strong>  | {booking.time}  | people   {booking.people} | {booking.email} </li>
                            </ul>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
