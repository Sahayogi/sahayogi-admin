import React, { useState, useEffect } from 'react';
import './Milestones.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Milstones = () => {
  const [resData, setResData] = useState('');
  const fetchData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    const { data } = await axios.get(
      'http://localhost:5000/api/user/home',
      config
    );
    console.log(`Milestone`, data.data);
    setResData(data.data);
    console.log(resData);
    console.log(`Res Data`);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='featured'>
      <Link to='/projects'>
        <div className='featuredItem'>
          <span className='featuredItemName'>Donation Projects</span>
          <div className='featuredContainer'>
            <span className='featuredItemCount'>{resData.numberOfProject}</span>
          </div>
        </div>
      </Link>

      <Link to='/beneficiary'>
        <div className='featuredItem'>
          <span className='featuredItemName'>Benefeceries</span>
          <div className='featuredContainer'>
            <span className='featuredItemCount'>
              {resData.numberOfBeneficiary}
            </span>
          </div>
        </div>
      </Link>
      <Link to='/vendor'>
        <div className='featuredItem'>
          <span className='featuredItemName'>Vendors</span>
          <div className='featuredContainer'>
            <span className='featuredItemCount'>{resData.numberOfVendor}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Milstones;
