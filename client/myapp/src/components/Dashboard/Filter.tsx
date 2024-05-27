import React, { useState } from 'react';
import './Filter.css';
import axios from 'axios';

interface FilterProps {
    onFilterChange: (filterSelection: FilterSelection) => void;
}

interface FilterSelection {
    sortBy: string | null;
    gym: string | null;
    equipments: string[];
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const API = process.env.REACT_APP_API;
    const [selectedSortBy, setSelectedSortBy] = useState<string | null>(null);
    const [selectedGym, setSelectedGym] = useState<string | null>(null);
    const [equipments, setEquipments] = useState<string[]>([]);
    const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

    const gyms = ['Auditorium', 'Heemang', 'Mir', 'Silloe', 'Yeoul'];
    const gymEquipment: { [key: number]: string } = {1: "Cable Crossover Machine", 2: "Motorized Inversion Table", 3: "Lat Pulldown Machine", 4: "Butterfly Machine", 5: "Abdominal Crunch Machine", 6: "Flat Bench Press Machine", 7: "Seated Leg Press Machine", 8: "Leg Extension Machine", 9: "Inner Thigh Machine", 10: "Leg Curl Machine", 11: "Torso Rotation Machine", 12: "Incline Bench Press Machine", 13: "Treadmill", 14: "Elliptical Stepper", 15: "Vibrating Belt Massager", 16: "Spin Bike", 17: "Sit-up Bench", 18: "Dumbbells", 19: "Bench Press Station", 20: "Smith Machine", 21: "Squat Rack", 22: "Dip Station", 23: "Curl Bar", 24: "Standing Hip Abduction Machine", 25: "Stepper", 26: "Seated Row Machine", 27: "Preacher Curl Bench", 28: "Cable Pulley Machine", 29: "Shoulder Press Machine", 30: "Standing Calf Raise Machine", 31: "Push-up Bars", 32: "Deadlift Blocks", 33: "Trap Bar", 34: "Heavy Bag", 35: "Hyperextension Bench", 36: "Hip Abduction Machine", 37: "Pull-up Bar", 38: "Incline Bench", 39: "Hula Hoop", 40: "Jump Rope", 41: "Kettlebells", 42: "Exercise Mat", 43: "Flat bench", 44: "Diet Machine"};
    

    const getEquipments = async (gym: string) => {
        const gymID = gyms.indexOf(gym) + 1;
        let equipmentIDList: number[] = [];

        const getEquipmentList = async () => {
            try {
                const response = await axios.get(API + "/user/getEquipments", {
                    params: { gymID }
                });
                equipmentIDList = response.data;
            } catch (error) {
                console.error("Error fetching equipment list:", error);
            }
        }

        const fetchAndLogEquipmentList = async () => {
            await getEquipmentList();
            const equipmentNames = equipmentIDList.map(id => gymEquipment[id]);
            setEquipments(equipmentNames);
        }

        fetchAndLogEquipmentList();
    }

    const handleSortByChange = (sortBy: string) => {
        setSelectedSortBy(sortBy);
        setSelectedGym(null);
        setSelectedEquipments([]);
        onFilterChange({ sortBy, gym: null, equipments: [] });
    };

    const handleGymChange = (gym: string) => {
        setSelectedGym(gym);
        setSelectedEquipments([]);
        getEquipments(gym);
        onFilterChange({ sortBy:selectedSortBy, gym, equipments: []});
    };

    const handleEquipmentChange = (equipment: string) => {
        let updatedEquipments;
        if (selectedEquipments.includes(equipment)) {
            updatedEquipments = selectedEquipments.filter(e => e !== equipment);
        } else {
            updatedEquipments = [...selectedEquipments, equipment];
        }
        setSelectedEquipments(updatedEquipments);
        onFilterChange({ sortBy: selectedSortBy, gym: selectedGym, equipments: updatedEquipments });
    };

    return (
        <div className="filter-container">
            <div className="segment">
                <div className="sort-by">
                    <div>
                        <input
                            type="checkbox"
                            checked={selectedSortBy === 'Gym'}
                            onChange={() => handleSortByChange('Gym')}
                        /> Gym
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={selectedSortBy === 'Equipment'}
                            onChange={() => handleSortByChange('Equipment')}
                        /> Equipment
                    </div>
                </div>
            </div>
            {selectedSortBy === 'Gym' && (
                <div className="segment">
                    <div className="gyms">
                        {gyms.map(gym => (
                            <div key={gym}>
                                <input
                                    type="checkbox"
                                    checked={selectedGym === gym}
                                    onChange={() => handleGymChange(gym)}
                                /> {gym}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedGym && (
                <div className="segment">
                    <div className="equipments">
                        {equipments.map(equipment => (
                            <div key={equipment}>
                                <input
                                    type="checkbox"
                                    checked={selectedEquipments.includes(equipment)}
                                    onChange={() => handleEquipmentChange(equipment)}
                                /> {equipment}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;
