import React from 'react';

const Donate = () => {
    return (
        <div className="donate">
            Donate
            <div className="donate__form">
                <div className="input__container">
                    <div className="benefeceries">
                        <span>Benefecries</span>
                        <input type="text" placeholder="benefeceries wallet address" />
                    </div>

                    <div className="your wallet address">
                        <span>Your wallet adress</span>
                        <input type="text" placeholder="your wallet adress" />
                    </div>
                    
                    <div className="amount">
                        <span>Amount to donate</span>
                        <input type="number" placeholder="amount" />
                    </div>

                    <button>Donate</button>
                </div>

            </div>

        </div>
    )
}

export default Donate;
