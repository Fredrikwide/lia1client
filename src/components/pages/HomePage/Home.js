import React from 'react'
import HeroSection from '../../HeroSection'
import Navbar from '../../Navbar'
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data'

const Home = () => {
    return (
        <>
            <HeroSection {...homeObjOne} />
        </>
    )
}

export default Home
