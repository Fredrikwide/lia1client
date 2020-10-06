import React, { useState, createContext } from 'react'


export const UserContext = createContext();


export const UserProvider = props => {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    })
    const [loggedIn, setLoggedIn] = useState(false)

    const userContextValue = {

        userData,
        setUserData,
        loggedIn,
        setLoggedIn
    }

    return (
        <UserContext.Provider
            value=
            {userContextValue}
        >
            {props.children}
        </UserContext.Provider>
    )
}