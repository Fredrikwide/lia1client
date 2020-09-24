import React, {useState} from 'react'
import Datepicker from 'react-date-picker'

const ChooseDate = () => {

    const [value, onChange] = useState(new Date());

    return ( 
        <>
            <p>Here will be a place to choose a date and time</p>
            <Datepicker
                onChange={onChange}
                value={value}
            />
        </>
     );
}
 
export default ChooseDate;