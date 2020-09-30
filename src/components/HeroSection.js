import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './HeroSection.css'



const HeroSection = ({
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart
}) => {
    return (
        <>

            <div className=


                'home__hero-section'

            >
                <div className="container">
                    <div className="row home__hero-row"
                        style={
                            { display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row' }}
                    >
                        <div className="col">
                            <div className="home__hero-text-wrapper">
                                <div className="top-line">
                                    {topLine}
                                </div>
                                <h1
                                    className=
                                    {
                                        lightText ?
                                            'heading'
                                            :
                                            'heading dark'
                                    }>
                                    {headline}
                                </h1>
                                <p className=
                                    {lightTextDesc ?
                                        'home__hero-subtitle'
                                        :
                                        'home__hero-subtitle dark'
                                    }>{description}</p>
                                <Link to="/sign-up">
                                    <Button
                                        buttonSize='btn--wide'
                                        buttonColor='black'
                                    >
                                        {buttonLabel}
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection