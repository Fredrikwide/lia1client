import '../../HeroSection.css'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import HeroSection from '../../HeroSection'
import HeroSectionDefault from '../../HeroSectionDefault'
import { homeObjOne } from '../HomePage/Data'



const Home = () => {




    return (
        <>
            <HeroSection {...homeObjOne} />
        </>
    )
}

export default Home
