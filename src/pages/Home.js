import React from 'react';
import home from '../assets/Home1.jpg'

const Home = () => {
    return (
        <div className="home">
            <div className="grid">
                <div className="upper__div" >

                    <div className="upper__divimage">
                        <div className="upper__divimageText" >
                            <h1> CASH AND VOUCHER ASSISTANCE USING BLOCKCHAIN</h1>
                        </div>
                        <img src={home} alt="" />
                    </div>

                </div>
                <div className="lower__div">
                    <div className="lower__divcontainer">
                    <div className="one">
                        
                    </div>
                    <div className="two">
                        
                    </div>
                    <div className="two">
                        
                    </div>
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

export default Home;
