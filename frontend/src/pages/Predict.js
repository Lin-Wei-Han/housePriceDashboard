import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import * as predictResultAPIs from "../apis/predictResult";


const Home = () => {
    const predictResult = (_buildingArea, _roomAmount, _livingroomAmount, _bathroomAmount) => {
        const postData = { buildingArea: _buildingArea, roomAmount: _roomAmount, livingroomAmount: _livingroomAmount, bathroomAmount: _bathroomAmount };

        predictResultAPIs.predictResult(postData).then((res) => {
            console.log(res);
        });
    };

    React.useEffect(() => {
        predictResult(140, 3, 2, 2)
        predictResultAPIs.getAPI().then((res) => {
            console.log(res);
        })
    }, [])


    return (
        <section className='body'>
            <Sidebar />
            <section className='container'>
                <Header />
            </section>
        </section>
    )
}

export default Home
