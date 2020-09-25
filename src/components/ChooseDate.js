import React, {useState, useEffect} from 'react'
import Datepicker from 'react-date-picker'

const ChooseDate = () => {

    const [value, setValue] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([])
    // Add how many seats per table to a config file
    const seats = 6
    let options = []

    useEffect(() => {
        // Each time the date changes, send to the db what date, and get back what times are available at that date, to then show the times in a dropdown
        //Add the times recieved from the db to the state array availableTimes for a check if the time should be disabled or not
        // Make sure you can't book on dates before today/earlier than the current time

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
    }, [value])

    // Get options of seats depending on amount of seats
    for(let i=1; i <= seats; i++) {
        options.push(<option key={i} value={i}>{i}</option>)
    }

    return ( 
        <>
            <p>Choose date and time</p>
            <form>
                <Datepicker
                    onChange={setValue}
                    value={value}
                />

                <select name="times" id="times">
                    <option disabled selected> - Time - </option>
                    <option value='18' disabled={availableTimes.includes(18) ? null : 'disabled'}>18:00</option>
                    <option value='21' disabled={availableTimes.includes(21) ? null : 'disabled'}>21:00</option>
                </select>

                <select name="seats" id="seats">
                    <option disabled selected value> - Seats - </option>      
                    {options}
                </select>

                <button>Book</button>
            </form>
        </>
     );
}
 
export default ChooseDate;