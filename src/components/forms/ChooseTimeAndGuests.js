import React, { useState, useContext } from 'react'
import { BookingContext } from '../../contexts/BookingContext'
import { UpdateContext } from '../../contexts/UpdateContext'

import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'


const ChooseTimeAndGuests = () => {



    const { formValues, setFormValues } = useContext(BookingContext)
    const { isClicked, setIsClicked } = useContext(UpdateContext)
    const { setIsHidden } = useContext(UpdateContext)

    const [pickedTime, setPickedTime] = useState(false)
    const [pickedSeat, setPickedSeat] = useState(false)

    const [defaultSelectTime, setDefaultSelectTime] = useState('- Time -')
    const [defaultSelectSeat, setDefaultSelectSeat] = useState('- Seat -')

    const [seats, setSeats] = useState([1, 2, 3, 4, 5, 6])



    const handleChangeTime = (e) => {
        setDefaultSelectTime(e.target.value)
        setFormValues({ ...formValues, time: e.target.value })
        setPickedTime(true)

    }

    const handleChangeSeats = (e) => {
        setDefaultSelectSeat(e.target.value)
        setFormValues({ ...formValues, seats: e.target.value })
        setPickedSeat(true)

    }

    const handleClickCont = (e) => {
        console.log('clickityCalckity is', isClicked)
        setIsHidden(true)
        setIsClicked(true)

    }



    return (
        <>

            <div className="select-outer">
                <div className="select-inner">
                    <select
                        name="time"
                        id="time"
                        onChange={handleChangeTime}
                        value={defaultSelectTime}
                        required>

                        <option
                            value={defaultSelectTime}
                            disabled >{defaultSelectTime}
                        </option>
                        <option
                            value={'18:00'} >18:00</option>
                        <option
                            value={'21:00'} >21:00</option>

                    </select>
                </div>

                <div className="select-inner">
                    <select
                        name="seats"
                        id="seats"
                        onChange={handleChangeSeats}
                        value={defaultSelectSeat}
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
                    :
                    <p className="pickInfo">you must choose a time and seats to continue</p>
            }

        </>
    )
}

export default ChooseTimeAndGuests
