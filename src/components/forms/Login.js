import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import '../Button.css'
import { login } from '../../services/fetch'

const Login = () => {

    const navigate = useNavigate()
    const { setLoggedIn, setUserData } = useContext(UserContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogIn = async (e) => {
        e.preventDefault()

        try {
            const loginAdmin = { email, password };
            const loginRes = await login(loginAdmin)

            if (loginRes.status === 200) {
                setUserData({
                    token: loginRes.data.token,
                    user: loginRes.data.user
                })
                localStorage.setItem('auth-token', loginRes.data.token)

                setLoggedIn(true)

                navigate('/admin', { replace: true })
            }

        } catch (err) {
            setErrorMessage(err.response.data.data.message)
            setErr(true)

        }


    }

    return (
        <form onSubmit={handleLogIn}>
            <div className={!err ? 'form-wrapper' : 'from-wrapper-error'}>

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
            {
                err && <div className="error">
                    <p>{errorMessage}</p>
                </div>
            }

        </form>
    )
}

export default Login
