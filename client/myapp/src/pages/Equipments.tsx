import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordian from '../components/GalleryView/Accordian';
import './Equipments.css';

interface Equipment {
    equipmentName: string;
    type: string;
    largerBodyPart: string;
    targetArea: string[];
}

const EquipmentPage: React.FC = () => {
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
    const API = process.env.REACT_APP_API;

    const getEquipments = async () => {
        try {
            const response = await axios.get(`${API}/public/getEquipments`);
            setEquipmentList(response.data);
        } catch (error) {
            console.error("Error fetching equipment list:", error);
        }
    };

    useEffect(() => {
        getEquipments();
    }, []);

    const renderEquipmentByBodyPart = () => {
        const bodyPartsOrder = ['Full Body', 'Upper Body', 'Core', 'Lower Body'];
        const groupedEquipment = equipmentList.reduce((acc, equipment) => {
            const { largerBodyPart } = equipment;
            if (!acc[largerBodyPart]) {
                acc[largerBodyPart] = [];
            }
            acc[largerBodyPart].push(equipment);
            return acc;
        }, {} as Record<string, Equipment[]>);

        return bodyPartsOrder.map((bodyPart) => (
            groupedEquipment[bodyPart] && (
                <div key={bodyPart}>
                    <h2>{bodyPart}</h2>
                    <Accordian items={groupedEquipment[bodyPart]} />
                </div>
            )
        ));
    };

    return (
        <div className="equipmentPage">
            <h1>Equipment Page</h1>
            {renderEquipmentByBodyPart()}
        </div>
    );
};

export default EquipmentPage;
