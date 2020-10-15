import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';

import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import HeroSectionDefault from './components/HeroSectionDefault';
import Footer from './components/pages/Footer/Footer'
import { UserContext } from './contexts/UserContext'

import Login from './components/forms/Login';
import Privacy from './components/Privacy';
import AdminHome from './components/admin/AdminHome';
import Success from './components/Success';
import { checkToken } from './services/authToken'
import { getUserFromToken } from './services/fetch'

const App = () => {

  const { setUserData, loggedIn, setLoggedIn } = useContext(UserContext)


  useEffect(() => {
    const asc = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.setItem('auth-token', '')
        token = '';
      }
      const resp = await checkToken(token)
      console.log('checking resp in app', resp)
      if (resp) {
        const userRes = await getUserFromToken(token)
        console.log("user resp in app", userRes, 'token is ', token)
        setUserData({
          token,
          user: userRes.data
        })
        setLoggedIn(true)
      }
    }

    asc()

  }, [])



  return (

    <Router>


      <Navbar />

      <Routes>
        <div className="background-wrapper">
          <HeroSectionDefault>
            <Route path='/' element={<Home />} />
            <Route path='/book' element={<Book />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/menu' element={<Home />} />
            {!loggedIn &&
              <Route path='/login' element={<Login />} />
            }
            <Route path='/success' element={<Success />} />
          </HeroSectionDefault>
        </div>

        {loggedIn ?
          <Route path='/admin' element={<AdminHome />} /> : null
        }
      </Routes>
      <Footer />
    </Router>


  );
}

export default App;
