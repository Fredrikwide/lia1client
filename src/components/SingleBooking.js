import React, { useState, useContext } from 'react'
import Editor from './admin/Editor'
import { UpdateContext } from '../contexts/UpdateContext'

const SingleBooking = (props) => {

    const { setEditActive, editActive } = useContext(UpdateContext)
    const handleClick = () => {
        setEditActive(!editActive)
    }
    return (
        <>
            <div>
                <h1>booking info</h1>
                <p>{props.booking.firstname}</p>
                <button onClick={handleClick}>edit</button>

                {
                    editActive && <Editor booking={props.booking} />
                }
            </div>
        </>
    )
}

export default SingleBooking
