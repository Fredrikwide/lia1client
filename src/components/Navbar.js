import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IoMdRestaurant } from 'react-icons/io'
import { Button } from './Button'
import './Navbar.scss'
import { IconContext } from 'react-icons/lib'


const Navbar = () => {

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
    const { loggedIn } = useContext(UserContext)


    const handleClick = () => {
        setClick(!click)
    }

    const closeMobileMenu = () => {
        setClick(false)
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>

                <div className="navbar">
                    <div className="nav-wrapper">
                        <div className="navbar-container">

                            <Link to="/lia1client" className="navbar-logo" onClick={closeMobileMenu}>
                                <IoMdRestaurant className="navbar-icon" />
                        Cafe Disco
                    </Link>
                            <div className="menu-icon" onClick={handleClick}>
                                {click ? <FaTimes /> : <FaBars />}
                            </div>
                            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                                <li className="nav-item">
                                    <Link to="/lia1client" className="nav-links" onClick={closeMobileMenu}>
                                        Home
                            </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/privacy" className="nav-links" onClick={closeMobileMenu}>
                                        Privacy policy
                            </Link>
                                </li>
                                {
                                    loggedIn &&

                                    < li className="nav-item">
                                        <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
                                            Admin
                            </Link>
                                    </li>


                                }

                                <li className="nav-btn">
                                    {button ? (
                                        <Link to='/book' className="btn-link" >
                                            <Button buttonStyle='btn--outline'>BOOK TABLE</Button>
                                        </Link>
                                    ) : (
                                            <Link to='/book'
                                                className="btn-link"
                                                onClick={closeMobileMenu}>
                                                <Button
                                                    buttonStyle='btn--outline'
                                                    buttonSize='btn--mobile'>
                                                    BOOK TABLE
                                        </Button>
                                            </Link>
                                        )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
