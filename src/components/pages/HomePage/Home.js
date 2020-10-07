import '../../HeroSection.css'
import React from 'react';
import HeroSection from '../../HeroSection'
import { homeObjOne } from '../HomePage/Data'



const Home = () => {




    return (
        <>
            <HeroSection {...homeObjOne} />
        </>
    )
}

export default Home
