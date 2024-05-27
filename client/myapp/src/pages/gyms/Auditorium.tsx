import React, { useEffect, useState } from 'react';
import { Banner, getGymInfo } from '../../components/GymComponents'; 
import Carousel from '../../components/GalleryView/Carousel';
import '../../components/GymComponents.css'

const AuditoriumPage: React.FC = () => {
    const [equipmentList, setEquipmentList] = useState<string[]>([]);
    const gymID = 1; 

    useEffect(() => {
        const fetchGymInfo = async () => {
            try {
                const equipmentList = await getGymInfo(gymID);
                setEquipmentList(equipmentList);
            } catch (error) {
                console.error("Error fetching gym info:", error);
            }
        };

        fetchGymInfo();
    }, [gymID]);

    const imageUrls = equipmentList.map(equipmentName => `/img/Gyms/Auditorium/${equipmentName}.jpg`);

    return (
        <div>
            <Banner gymName="Auditorium" />
            <h1>Auditorium Page</h1>
            <p>Number of Equipments: { equipmentList.length }</p>
            <Carousel slides={imageUrls} />
        </div>
    );
};

export default AuditoriumPage;