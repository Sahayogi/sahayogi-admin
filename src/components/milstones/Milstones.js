import React from "react";
import "./Milestones.css";
import { Link } from "react-router-dom";
const Milstones = () => {
  return (
    <div className="featured">
      <Link to="/donate">
        <div className="featuredItem">
          <span className="featuredItemName">Donation Projects</span>
          <div className="featuredContainer">
            <span className="featuredItemCount">13</span>
          </div>
        </div>
      </Link>

      <Link to="/beneficiary">
        <div className="featuredItem">
          <span className="featuredItemName">Benefeceries</span>
          <div className="featuredContainer">
            <span className="featuredItemCount">8</span>
          </div>
        </div>
      </Link>
      <Link to="/vendor">
        <div className="featuredItem">
          <span className="featuredItemName">Vendors</span>
          <div className="featuredContainer">
            <span className="featuredItemCount">4</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Milstones;
