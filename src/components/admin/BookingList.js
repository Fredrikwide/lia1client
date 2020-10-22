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
            <div className="item-box">
                <ul className='list-group'>
                    {
                        props.booking.map((booking, index) => (

                            <li className='list-item'
                                onClick={() => handleEdit(booking)}
                                key={index}>
                                <div className='inner-text'>
                                    <strong>
                                        {booking.firstname}  {booking.lastname}

                                    </strong>
                                    <p>
                                        {booking.time}
                                    </p>

                                    <p>
                                        <span>people</span>

                                        {booking.people}
                                    </p>
                                    <p>
                                        {booking.email}
                                    </p>
                                </div>
                            </li>

                        ))
                    }
                </ul>
            </div>
        </>
    )
}
