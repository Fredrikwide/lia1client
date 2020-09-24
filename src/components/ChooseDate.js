import React, {useState, useEffect} from 'react'
import Datepicker from 'react-date-picker'

const ChooseDate = () => {

    const [value, setValue] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([])

    useEffect(() => {
        // Each time the date changes, send to the db what date, and get back what times are available at that date, to then show the times in a dropdown
        //Add the times recieved from the db to the state array availableTimes for a check if the time should be disabled or not
        // Make sure you can't book on dates before today/earlier than the current time
        setAvailableTimes([18, 21])
    }, [value])

    return ( 
        <>
            <p>Choose date and time</p>
            <Datepicker
                onChange={setValue}
                value={value}
            />

            {/* Make the times show from the start */}
            <select name="times" id="times">
                <option value="18" disabled={availableTimes.includes(18) ? null : 'disabled'}>18:00</option>
                <option value="21" disabled={availableTimes.includes(21) ? null : 'disabled'}>21:00</option>
            </select>
        </>
     );
}
 
export default ChooseDate;