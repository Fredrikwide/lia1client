import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import HeroSectionDefault from './components/HeroSectionDefault';
import Footer from './components/pages/Footer/Footer'
import { UserProvider, UserContext } from './contexts/UserContext'
import Axios from 'axios';
import Login from './components/forms/Login';

const App = () => {

  const { userData, setUserData } = useContext(UserContext)


  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.setItem('auth-token', '')
        token = '';
      }
      const tokenRes = await axios.post('http://localhost:5000/login/tokenIsValid', null,
        { headers: { "x-auth-token": token } }
      )
      if (tokenRes.data) {
        const UserRes = await axios.get('http://localhost:5000/login/', { headers: { 'x-auth-token': token } })
        setUserData({
          token,
          user: UserRes.data
        })
      }
    }
    checkLoggedIn()
  }, [])


  return (

    <Router>
      <Navbar />
      <Routes>
        <div className="background-wrapper">
          <HeroSectionDefault>
            <Route path='/' element={<Home />} />
            <Route path='/book' element={<Book />} />
            <Route path='/contact' element={<Home />} />
            <Route path='/menu' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </HeroSectionDefault>
        </div>
      </Routes>
      <Footer />
    </Router>


  );
}

export default App;
