import React, { useState, useContext, useEffect } from 'react'
import { BookingContext } from '../../contexts/BookingContext'
import { UpdateContext } from '../../contexts/UpdateContext'

import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'


const ChooseTimeAndGuests = () => {



    const { formValues, setFormValues } = useContext(BookingContext)
    const { fullyBooked, fullyBooked18, fullyBooked21 } = useContext(BookingContext)
    const { setIsClicked } = useContext(UpdateContext)
    const { setIsHidden } = useContext(UpdateContext)

    const [pickedTime, setPickedTime] = useState(false)
    const [pickedSeat, setPickedSeat] = useState(false)

    const [defaultSelectTime, setDefaultSelectTime] = useState('- Time -')
    const [defaultSelectSeat, setDefaultSelectSeat] = useState('- Seat -')

    const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6])

    useEffect(() => {


    }, [fullyBooked, fullyBooked18, fullyBooked21])


    const handleChangeTime = (e) => {
        setDefaultSelectTime(e.target.value)
        setFormValues({ ...formValues, time: e.target.value })
        setPickedTime(true)

    }

    const handleChangeSeats = (e) => {
        setDefaultSelectSeat(e.target.value)
        setFormValues({ ...formValues, people: e.target.value })

        setPickedSeat(true)

    }

    const handleClickCont = (e) => {
        setIsHidden(true)
        setIsClicked(true)
    }

    return (
        <>

            <div className="select-outer-cont">
                <div className="select-inner-cont">
                    <select
                        name="time"
                        id="time"
                        disabled={fullyBooked ? true : false}
                        onChange={handleChangeTime}
                        value={defaultSelectTime}
                        required>

                        <option
                            value={defaultSelectTime}
                            disabled >{defaultSelectTime}
                        </option>
                        <option
                            value={'18:00'}
                            disabled={fullyBooked18 ? true : false}
                        >18:00</option>
                        <option
                            value={'21:00'}
                            disabled={fullyBooked21 ? true : false}
                        >21:00</option>

                    </select>
                </div>

                <div className="select-inner-cont">
                    <select
                        name="seats"
                        id="seats"
                        onChange={handleChangeSeats}
                        value={defaultSelectSeat}
                        disabled={fullyBooked ? true : false}
                        required>
                        <option
                            value={defaultSelectSeat}
                            disabled>
                            {defaultSelectSeat}
                        </option>
                        {
                            seats.map((seat, index) =>
                                (<option
                                    key={index}
                                    value={seat}
                                >
                                    {seat}
                                </option>)
                            )
                        }
                    </select>
                </div>
            </div>

            {
                pickedTime && pickedSeat ? (
                    <div className="btn-wrapper">
                        <Button
                            type='button'
                            buttonSize='btn--medium'
                            buttonColor='black'
                            onClick={handleClickCont}>Continue</Button>
                    </div>)
                    : fullyBooked
                        ?
                        <p className="pickInfo">sorry fully booked on this date</p>
                        :
                        <p className="pickInfo">you must choose a time and seats to continue</p>
            }

        </>
    )
}

export default ChooseTimeAndGuests
