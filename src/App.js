import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';
import axios from 'axios'
import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import HeroSectionDefault from './components/HeroSectionDefault';
import Footer from './components/pages/Footer/Footer'
import { UserContext } from './contexts/UserContext'
import { UpdateContext } from './contexts/UpdateContext'
import Login from './components/forms/Login';
import Privacy from './components/Privacy';
import AdminHome from './components/admin/AdminHome';
import Success from './components/Success';

const App = () => {

  const { setUserData, loggedIn, setLoggedIn } = useContext(UserContext)
  const { pageReset } = useContext(UpdateContext)

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.setItem('auth-token', '')
        token = '';
      }
      const tokenRes = await axios.post('http://localhost:5000/admin/validToken', null,
        { headers: { "x-auth-token": token } }
      )
      if (tokenRes.data) {
        const UserRes = await axios.get('http://localhost:5000/admin/', { headers: { 'x-auth-token': token } })
        setUserData({
          token,
          user: UserRes.data
        })
        setLoggedIn(true)
      }

    }
    checkLoggedIn()

  }, [])

  useEffect(() => {
    console.log('i re-rendered')
  }, [pageReset])

  return (

    <Router>

      {!loggedIn &&
        <Navbar />
      }
      <Routes>
        <div className="background-wrapper">
          <HeroSectionDefault>
            <Route path='/' element={<Home />} />
            <Route path='/book' element={<Book />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/menu' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/success' element={<Success />} />
          </HeroSectionDefault>
        </div>
      </Routes>
      {loggedIn &&
        <Route path='/admin' element={<AdminHome />} />
      }
      <Footer />
    </Router>


  );
}

export default App;
