import React, { useContext, useEffect } from 'react';
import './Footer.css';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
import { MdFingerprint } from 'react-icons/md';
import { UserContext } from '../../../contexts/UserContext'

const Footer = () => {

    const { loggedIn, setLoggedIn } = useContext(UserContext)
    const { setUserData } = useContext(UserContext)

    useEffect(() => {
        console.log('logged in', loggedIn)

    }, [])

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        setLoggedIn(false)
    }

    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join our exclusive membership to receive the latest news and trends
        </p>
                <p className='footer-subscription-text'>
                    You can unsubscribe at any time.
        </p>
                <div className='input-areas'>
                    <form>
                        <input
                            className='footer-input'
                            name='email'
                            type='email'
                            placeholder='Your Email'
                        />
                        <Button buttonStyle='btn--medium'
                            buttonColor='black'>Subscribe</Button>
                    </form>
                </div>
            </section>
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
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <MdFingerprint className='navbar-icon' />
              LAVISH
            </Link>
                    </div>
                    <small className='website-rights'>Fredrik and Filip © 2020</small>
                    <div className='social-icons'>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <FaInstagram />
                        </Link>

                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <FaTwitter />
                        </Link>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <FaLinkedin />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;