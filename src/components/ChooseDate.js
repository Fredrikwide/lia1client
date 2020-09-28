import React, {useState, useEffect} from 'react'
import Datepicker from 'react-date-picker'
import config from '../config'

/**
 * TODO
 * 
 * Make sure you can't book on dates or time before current time
 * 
 */

const ChooseDate = () => {
    const [date, setDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([])
    const [formValues, setFormValues] = useState({
        date: null,
        time: '',
        seats: 0
    })

    // Adding 3 months to the current date
    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + config.maxMonths)

    
    useEffect(() => {
        // Each time the date changes
        // Send date to db
        // Get available times
        // Add times to the availableTimes state so that we can check if we need to disable the time option or not

        setFormValues(f => ({...f, date, time: ''}))

        let random = Math.floor(Math.random() * 30)

        if(random >= 30) {
            setAvailableTimes([])
        } else {
            let random = Math.floor(Math.random() * 3)
            if(random === 1) {
                setAvailableTimes([18, 21])
            } else if(random === 2) {
                setAvailableTimes([18])
            } else if(random === 3) {
                setAvailableTimes([21])
            }
        }
    }, [date])

    // Handler to hopefully handle all the form changes and add them to the form state....... Except the date, I have to update that in useEffect.
    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    // Get options of seats depending on amount of seats
    let options = []
    for(let i=1; i <= config.seats; i++) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    return ( 
        <>
            <p>Choose date and time</p>
            <form>
                {/* Can't figure out how to change the date without calling setDate directly on onChange... */}
                <Datepicker
                    onChange={setDate}
                    value={date}
                    maxDate={maxDate}
                />

                <select name="time" id="time" onChange={handleChange} value={formValues.time}>
                    <option value={''} disabled> - Time - </option>
                    <option value='18' disabled={availableTimes.includes(18) ? null : 'disabled'}>18:00</option>
                    <option value='21' disabled={availableTimes.includes(21) ? null : 'disabled'}>21:00</option>
                </select>

                <select name="seats" id="seats" onChange={handleChange} value={formValues.seats}>
                    <option value={0} disabled> - Seats - </option>      
                    {options}
                </select>

                <button>Book</button>
            </form>
        </>
     );
}
 
export default ChooseDate;