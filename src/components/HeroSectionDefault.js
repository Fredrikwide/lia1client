import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './HeroSection.css'
import Home from './pages/HomePage/Home'
import Book from './Book'

import Login from './forms/Login'

import AdminHome from './admin/AdminHome'
import Success from './Success'
import { UpdateContext } from '../contexts/UpdateContext'
import Privacy from './Privacy'





const HeroSectionDefault = () => {
    const { isHidden } = useContext(UpdateContext)
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
                            <Routes >
                                <Route path="/" element={<Home />} />
                                <Route path="/book" element={<Book />} />
                                <Route path="/admin" element={<AdminHome />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/privacy" element={<Privacy />} />

                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSectionDefault



/**
 *  {path === '/'
                                ? (<Home path={path} />)
                                : path === '/book' && !isHidden
                                    ? (<Book />) :
                                    path === '/admin'
                                        ? <AdminHome />
                                        : path === '/login'
                                            ? <Login /> : path === '/success' ?
                                                <Success /> :

                                                <Home />

                            }
 */