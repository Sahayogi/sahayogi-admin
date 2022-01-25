import React from 'react';
import './Milestones.css'
const Milstones = () => {
    return (
    <div className="featured">

        <div className="featuredItem">
            <span className="featuredItemName">Donation Projects</span>
            <div classname="featuredContainer">
                <span className="featuredItemCount">13</span>
            </div>
        </div>

        <div className="featuredItem">
            <span className="featuredItemName">Benefeceries</span>
            <div classname="featuredContainer">
                <span className="featuredItemCount">8</span>
            </div>
        </div>

        <div className="featuredItem">
            <span className="featuredItemName">Vendors</span>
            <div classname="featuredContainer">
                <span className="featuredItemCount">4</span>
            </div>
        </div>


    </div>
    )
}

export default Milstones;
