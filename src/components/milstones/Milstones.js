import React, { useState, useEffect } from "react";
import "./Milestones.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Milstones = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/user/home",
        config
      );

      setPosts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err, "error occured");
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="featured">
      <Link to="/projects">
        <div className="featuredItem">
          <span className="featuredItemName">Donation Projects</span>
          <div className="featuredContainer">
            <span className="featuredItemCount">{posts.numberOfProject}</span>
          </div>
        </div>
      </Link>

      <Link to="/beneficiary">
        <div className="featuredItem">
          <span className="featuredItemName">Benefeceries</span>
          <div className="featuredContainer">
            <span className="featuredItemCount">
              {posts.numberOfBeneficiary}
            </span>
          </div>
        </div>
      </Link>
      <Link to="/vendor">
        <div className="featuredItem">
          <span className="featuredItemName">Vendors</span>
          <div className="featuredContainer">
            <span className="featuredItemCount">{posts.numberOfVendor}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Milstones;
