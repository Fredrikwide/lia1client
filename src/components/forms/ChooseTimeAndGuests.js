import React, { useState, useContext, useEffect } from 'react'
import { checkAvailability } from '../routes/fetch'
import { DateContext } from '../../contexts/DateContext'
import { TimeContext } from '../../contexts/TimeContext'
import { FormContext } from '../../contexts/FormContext'
import { UpdateContext } from '../../contexts/UpdateContext'

import { config } from '../../config/index'
import { Button } from '../Button'
import '../Button.css'
import '../MakeBooking.css'


const ChooseTimeAndGuests = () => {



    const { formValues, setFormValues } = useContext(FormContext)
    const { availableFirst, setAvailableFirst } = useContext(TimeContext)
    const { availableLast, setAvailableLast } = useContext(TimeContext)
    const { isClicked, setIsClicked } = useContext(UpdateContext)
    const { isHidden, setIsHidden } = useContext(UpdateContext)

    const [pickedTime, setPickedTime] = useState(false)
    const [pickedSeat, setPickedSeat] = useState(false)
    const [defaultSelectTime, setDefaultSelectTime] = useState('- Time -')
    const [defaultSelectSeat, setDefaultSelectSeat] = useState('- Seat -')





    const handleChangeTime = (e) => {
        setFormValues({ ...formValues, time: e.target.value })
        setPickedTime(true)

    }

    const handleChangeSeats = (e) => {

        setFormValues({ ...formValues, seats: e.target.value })
        setPickedSeat(true)

    }

    const handleClickCont = (e) => {
        console.log('clickityCalckity is', isClicked)
        setIsHidden(true)
        setIsClicked(true)

    }

    let options = []
    for (let i = 1; i <= config.seats; i++) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    return (
        <>

            <div className="select-outer">
                <div className="select-inner">
                    <select
                        name="time"
                        id="time"
                        defaultValue={defaultSelectTime}
                        onChange={handleChangeTime}
                        value={formValues.time}
                        required>

                        <option
                            value={defaultSelectTime}
                            disabled >{defaultSelectTime}
                        </option>
                        <option
                            value={'18.00'} disabled={!availableFirst ? true : false} >18:00</option>
                        <option
                            value={'21.00'} disabled={!availableLast ? true : false} >21:00</option>

                    </select>
                </div>

                <div className="select-inner">
                    <select
                        name="seats"
                        id="seats"
                        defaultValue={defaultSelectSeat}
                        onChange={handleChangeSeats}
                        value={formValues.seats}
                        required>
                        <option value={0} value={defaultSelectSeat} disabled> - Seats - </option>
                        {options}
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
