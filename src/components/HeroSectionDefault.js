import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import './HeroSection.css'
import Home from './pages/HomePage/Home'
import Book from './Book'

import Login from './forms/Login'
import Privacy from './Privacy'
import AdminHome from './admin/AdminHome'
import Success from './Success'





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
                                    path === '/admin'
                                        ? <AdminHome />
                                        : path === '/login'
                                            ? <Login /> : path === '/success' ?
                                                <Success /> :

                                                <Home />

                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HeroSectionDefault
