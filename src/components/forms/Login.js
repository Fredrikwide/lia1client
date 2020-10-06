import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import '../Button.css'
import axios from 'axios'


const Login = () => {

    const navigate = useNavigate()
    const { loggedIn, setLoggedIn, setUserData } = useContext(UserContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [checkPassword, setCheckPassword] = useState()
    const [errorMsg, setErrorMsg] = useState(false)

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogIn = async () => {
        const loginAdmin = { email, password };
        const loginRes = await axios.post('http://localhost:5000/login/login', loginAdmin)
        console.log(loginRes)
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem('auth-token', loginRes.data.token)
        setLoggedIn(true)
        navigate('/', { replace: true })

    }

    return (
        <div>
            <h1 className="header dark">Log in</h1>
            <div className="form-wrapper">
                <div className="nameWrapper inpWrapper">
                    <label>Email</label>
                    <input
                        type="email"
                        onChange={handleChangeEmail}
                        name="firstname"
                        placeholder="enter your email"
                        required />
                </div>
                <div className="nameWrapper inpWrapper">
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={handleChangePassword}
                        name="password"
                        placeholder="enter your password"
                        required />
                </div>

            </div>
            <div className="btn-wrapper">
                {!errorMsg ?
                    <Button
                        type="submit"
                        buttonSize='btn--medium'
                        buttonColor='black'
                        onClick={handleLogIn}
                    >Sign In</Button> : <p>{errorMsg}</p>
                }
            </div>
        </div>
    )
}

export default Login
