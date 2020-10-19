import React, { useContext, useState } from 'react'
import Axios from 'axios'
import { UpdateContext } from '../../contexts/UpdateContext'
import { Button } from '../Button'
import { UserContext } from '../../contexts/UserContext'

const Editor = (props) => {
    console.log(props)
    const { updatedBooking,
        setUpdatedBooking } = useContext(UpdateContext)

    const [editBookingInfo, setEditBookingInfo] = useState({
        firstname: props.booking.firstname,
        lastname: props.booking.lastname,
        email: props.booking.email,
        phone: props.booking.phone,
        date: props.booking.date,
        time: props.booking.time
    })
    const { userData } = useContext(UserContext)
    console.log('USER DATA IN EDITOR', userData)
    const [defaultSelectTime, setDefaultSelectTime] = useState('- Time -')
    const [id, setId] = useState(props.booking._id)

    const postEditToBooking = async (data) => {
        if (userData.token) {
            const editBookingRes = await Axios.put(`http://localhost:5000/admin/reservation/${id}`, data, { headers: { 'x-auth-token': userData.token } })
            if (editBookingRes.status === 200) {
                setUpdatedBooking(!updatedBooking)
            }
        }
    }


    const handleChangefirstName = (e) => {
        setEditBookingInfo({ ...editBookingInfo, firstname: e.target.value })
        console.log(editBookingInfo.firstname)
    }

    const handleChangelastName = (e) => {
        setEditBookingInfo({ ...editBookingInfo, lastname: e.target.value })
    }

    const handleChangeEmail = (e) => {
        setEditBookingInfo({ ...editBookingInfo, email: e.target.value })
    }

    const handleChangePhone = (e) => {
        setEditBookingInfo({ ...editBookingInfo, phone: e.target.value })
    }

    const handleChangeTime = (e) => {
        setDefaultSelectTime(e.target.value)
        setEditBookingInfo({ ...editBookingInfo, time: e.target.value })
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        postEditToBooking(editBookingInfo)


        // Send the info in FormValues to the db to save the booking
    }
    return (
        <>
        <div className="edit-form">
            <form onSubmit={handleSubmit}>
                <div className="form-wrapper-edit">
                    <div className="nameWrapper inpWrapper">
                        <label>First name</label>
                        <input
                            type="text"
                            onChange={handleChangefirstName}
                            name="firstname"
                            value={editBookingInfo.firstname} />
                    </div>
                    <div className="nameWrapper inpWrapper">
                        <label> last name</label>
                        <input
                            type="text"
                            onChange={handleChangelastName}
                            name="lastname"
                            value={editBookingInfo.lastname} />
                    </div>
                    <div className="emailWrapper inpWrapper">
                        <label>email</label>
                        <input
                            type="email"
                            onChange={handleChangeEmail}
                            name="email"
                            value={editBookingInfo.email} />
                    </div>
                    <div className="phoneWrapper inpWrapper">
                        <label>phone</label>
                        <input
                            type="tel"
                            minLength="10"
                            maxLength="12"
                            onChange={handleChangePhone}
                            name="phone"
                            value={editBookingInfo.phone} />

                    </div>
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
                            value={'18:00'}

                        >18:00</option>
                        <option
                            value={'21:00'}

                        >21:00</option>

                    </select>
                    <div className="btn-wrapper">

                        <Button
                            type='submit'
                            buttonSize='btn--medium'
                            buttonColor='black'
                        >Save changes
                            </Button>


                    </div>

                </div>
            </form>
        </div>
        </>
    )
}

export default Editor
