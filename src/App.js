import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { DateProvider } from './contexts/DateContext'
import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home';
import HeroSectionDefault from './components/HeroSectionDefault';
import Footer from './components/pages/Footer/Footer'

function App() {
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
          </HeroSectionDefault>
        </div>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
