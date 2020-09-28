import React from 'react'

import './jumbo.scss'

const Jumbo = () => {
    return (
        <div className="outer-wrapper">
            <div className="inner-wrapper">
                <div className="text-wrapper">
                    <div className="headOneText">
                        <h1>I am the Hero</h1>
                    </div>
                    <div className="headTwoText">
                        <h2>The coolest place in town</h2>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button className="btnClick">Click me to Join</button>
                </div>
            </div>
        </div>   
    )
}

export default Jumbo
