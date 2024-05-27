import React from 'react';
import './Home.css';

const HomePage: React.FC = () => {
    const map = '/img/map.png';
    return (
        <div className="homepage-container">
            <div className="titlebanner">
                <h1 className="title">Welcome to Kaist Health!</h1>
            </div>
            <img src={map} alt="Map" className="map-image" />
        </div>
    );
};

export default HomePage;
