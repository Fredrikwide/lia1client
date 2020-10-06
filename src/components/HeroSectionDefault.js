import React, { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'
import './HeroSection.css'
import Home from './pages/HomePage/Home'
import Book from './Book'
import Contact from './Contact'
import Login from './forms/Login'





const HeroSectionDefault = () => {

    const location = useLocation()
    const [path, setPath] = useState(location.pathname)
    useEffect(() => {

        setPath(location.pathname)

    }, [location])


    return (
        <>
            <div className='home__hero-section'>
                <div className="container">
                    <div className="row home__hero-row">

                        <div className="home__hero-text-wrapper">
                            {path === '/'
                                ? (<Home path={path} />)
                                : path === '/book'
                                    ? (<Book />) :
                                    path === '/contact'
                                        ? <Contact />
                                        : path === '/login'
                                            ? <Login />
                                            : <Home />

                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HeroSectionDefault
