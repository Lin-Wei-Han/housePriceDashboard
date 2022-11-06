import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Citycard from '../components/Citycard';


const Home = () => {
    return (
        <section className='body'>
            <Sidebar />
            <section className='container'>
                <Header />
                <div className='citycard'>
                    <Citycard />
                    <div className='city-right-card'>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Home
