import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Banner, getGymInfo } from '../../components/GymComponents';
import '../../components/GymComponents.css'

const AuditoriumPage = () => {
    const gymID = 1; 
    const [equipmentList, setEquipmentList] = useState<string[]>([]);
    const [fullEquipmentList, setFullEquipmentList] = useState<string[]>([]);

    useEffect(() => {
        const fetchGymInfo = async () => {
            try {
                const { equipmentList, fullEquipmentList } = await getGymInfo(gymID);
                setEquipmentList(equipmentList);
                setFullEquipmentList(fullEquipmentList);
            } catch (error) {
                console.error("Error fetching gym info:", error);
            }
        };

        fetchGymInfo();
    }, []);

    //count length of list --> Info: $ of equipment
    //Carousel 
    return (
        <div>
            <Banner gymName="Auditorium" />
            <h1></h1>
            <p>Number of Equipments: { equipmentList.length }</p>
            <ul>
                {equipmentList.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
            <h2>Full Equipment List</h2>
            <ul>
                {fullEquipmentList.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AuditoriumPage;