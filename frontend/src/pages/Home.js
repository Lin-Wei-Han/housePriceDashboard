import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Citycard from '../components/Citycard';
import ApexChart from '../components/ApexChart';


const Home = () => {


    return (
        <section className='body'>
            <Sidebar />
            <section className='container'>
                <Header />
                <div className='citycard'>
                    <Citycard />
                </div>
                <ApexChart />
            </section>
        </section>
    )
}

export default Home
