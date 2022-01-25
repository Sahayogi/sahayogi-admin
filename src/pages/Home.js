import React from 'react';
import Charts from '../components/charts/Charts';
import Milstones from '../components/milstones/Milstones';
import {donationData} from '../components/constants/Constant'

const Home = () => {
    return (
        <div className="home">

         <Milstones/>
         <Charts data={donationData} title="Donation Analytics" grid dataKey="Donations" />
         
        </div>
    )
}

export default Home;
