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


    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogIn = async (e) => {
        e.preventDefault()
        const loginAdmin = { email, password };
        const loginRes = await axios.post('http://localhost:5000/admin/login', loginAdmin)
        console.log(loginRes)
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem('auth-token', loginRes.data.token)

        setLoggedIn(true)

        navigate('/admin', { replace: true })

    }

    return (
        <form onSubmit={handleLogIn}>
            <div className="form-wrapper">

                <h1 className="header dark">Log in</h1>

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

                <div className="btn-wrapper">
                    <Button
                        type="submit"
                        buttonSize='btn--medium'
                        buttonColor='black'
                        buttonStyle='btn--outline'
                    >Sign In</Button>
                </div>
            </div>


        </form>
    )
}

export default Login
