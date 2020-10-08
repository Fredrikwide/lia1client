import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import './Footer.css';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext'

const Footer = () => {
    const navigate = useNavigate()
    const { loggedIn, setLoggedIn } = useContext(UserContext)
    const { setUserData } = useContext(UserContext)

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        setLoggedIn(false)
        navigate('/', { replace: true })

    }

    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>

                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <h2>Staff</h2>
                        {!loggedIn ? <Link to='/login'>Log in</Link> : <Button buttonColor="black"
                            buttonSize="small"
                            onClick={logout}>
                            Log out
                            </Button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;