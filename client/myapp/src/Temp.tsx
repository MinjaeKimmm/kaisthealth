import React from 'react';
import {Login} from './components/Auth';


const TempPage = () => {
    return ( 
        <div>
            <h1>Temp Page</h1>
            <Login />
        </div>
    )
}
/*
import Accordian from './components/GalleryView/Accordian';
import Auth from './temp/Auth'
import './temp/Auth.css';

const TempPage = () => {
    return (
        <div>
            <Auth />
        </div>
    );
};


const TempPage = () => {
    return (
        <div>
            <h1>Temp Page</h1>
            <p>This is the temp page</p>
            <Accordian />
        </div>
    );
}*/


/*
import Carousel from './components/GalleryView/Carousel';
import './components/GalleryView/Carousel.css'

const image1 = process.env.PUBLIC_URL + "/img/icon.jpg";
const image2 = process.env.PUBLIC_URL + "/img/Gyms/Mir/bench.jpg";
const image3 = process.env.PUBLIC_URL + "/img/Gyms/Mir/bench.jpg";
const image4 = process.env.PUBLIC_URL + "/img/Gyms/Mir/bench.jpg";
const image5 = process.env.PUBLIC_URL + "/img/Gyms/Mir/bench.jpg";
const image6 = process.env.PUBLIC_URL + "/img/Gyms/Mir/bench.jpg";

const imgs = [image1, image2, image3, image4, image5, image6];

 
const TempPage = () => {
    return (
        <div>
            <h1>Temp Page</h1>
            <p>This is the temp page.</p>
            <Carousel slides={imgs} />;
        </div>
    );
};
*/
export default TempPage;