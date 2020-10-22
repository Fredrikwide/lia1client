import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './HeroSection.css'
import Home from './pages/HomePage/Home'
import Book from './Book'

import Login from './forms/Login'

import AdminHome from './admin/AdminHome'
import Success from './Success'

import Privacy from './Privacy'





const HeroSectionDefault = () => {




    return (
        <>
            <div className='home__hero-section'>
                <div className="container">
                    <div className="row home__hero-row">
                        <div className="home__hero-text-wrapper">
                            <Routes >
                                <Route path="/lia1client" element={<Home />} />
                                <Route path="/book" element={<Book />} />
                                <Route path="/admin" element={<AdminHome />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/success" element={<Success />} />
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