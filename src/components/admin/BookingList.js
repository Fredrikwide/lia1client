import React, { useContext } from 'react'
import { UpdateContext } from '../../contexts/UpdateContext'

export const BookingList = (props) => {

    const { setHideCal, setDispSingleBooking, setCurrBooking } = useContext(UpdateContext)




    const handleEdit = (data) => {

        setHideCal(true)
        setDispSingleBooking(true)
        setCurrBooking(data)
    }



    return (
        <>
            <div className="inner">
                <div className="item-box">
                    <ul>
                        {
                            props.booking.map((booking, index) => (

                                <li key={index}
                                    onClick={() => handleEdit(booking)}
                                ><strong>{booking.firstname} {booking.lastname}</strong>  | {booking.time}  | people   {booking.people} | {booking.email} </li>

                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
