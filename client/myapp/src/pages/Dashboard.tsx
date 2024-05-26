import React, { useState } from 'react';
import Timetable from '../components/Dashboard/Timetable';
import Hello from '../components/Dashboard/Hello'
import Filter from '../components/Dashboard/Filter';
import "./Dashboard.css";
import { Router } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface FilterSelection {
    sortBy: string | null;
    gym: string | null;
    equipments: string[];
}

interface Gyms {
    [key: number]: string;
}

interface GymEquipment {
    [key: number]: string;
}

const DashboardPage = () => {
    const API = process.env.REACT_APP_API;
    const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [tasks, setTasks] = useState<Record<Day, string>>({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
    });
    const [currentDay, setCurrentDay] = useState<Day>('Monday');
    const [filterSelection, setFilterSelection] = useState<FilterSelection>({ sortBy: null, gym: null, equipments: [] })
    const [newText, setNewText] = useState('');
    const gyms: Gyms = {1: "Auditorium", 2: "Heemang", 3: "Mir", 4: "Silloe", 5: "Yeoul"};
    const gymEquipment: GymEquipment = {1: "Cable Crossover Machine", 2: "Motorized Inversion Table", 3: "Lat Pulldown Machine", 4: "Butterfly Machine", 5: "Abdominal Crunch Machine", 6: "Flat Bench Press Machine", 7: "Seated Leg Press Machine", 8: "Leg Extension Machine", 9: "Inner Thigh Machine", 10: "Leg Curl Machine", 11: "Torso Rotation Machine", 12: "Incline Bench Press Machine", 13: "Treadmill", 14: "Elliptical Stepper", 15: "Vibrating Belt Massager", 16: "Spin Bike", 17: "Sit-up Bench", 18: "Dumbbells", 19: "Bench Press Station", 20: "Smith Machine", 21: "Squat Rack", 22: "Dip Station", 23: "Curl Bar", 24: "Standing Hip Abduction Machine", 25: "Stepper", 26: "Seated Row Machine", 27: "Preacher Curl Bench", 28: "Cable Pulley Machine", 29: "Shoulder Press Machine", 30: "Standing Calf Raise Machine", 31: "Push-up Bars", 32: "Deadlift Blocks", 33: "Trap Bar", 34: "Heavy Bag", 35: "Hyperextension Bench", 36: "Hip Abduction Machine", 37: "Pull-up Bar", 38: "Incline Bench", 39: "Hula Hoop", 40: "Jump Rope", 41: "Kettlebells", 42: "Exercise Mat", 43: "Flat bench", 44: "Diet Machine"};
    
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(API + "/user/find-schedules");
                const schedules = response.data;

                const tasksFromDb: Record<Day, string> = {
                    Monday: '',
                    Tuesday: '',
                    Wednesday: '',
                    Thursday: '',
                    Friday: '',
                    Saturday: '',
                    Sunday: '',
                };

                const tempTasks: Record<Day, { [key: string]: string[] }> = {
                    Monday: {},
                    Tuesday: {},
                    Wednesday: {},
                    Thursday: {},
                    Friday: {},
                    Saturday: {},
                    Sunday: {},
                };

                schedules.forEach((schedule: { day: Day; gymID: number; equipmentID: number }) => {
                    const gymName = gyms[schedule.gymID];
                    const equipmentName = gymEquipment[schedule.equipmentID];

                    if (!tempTasks[schedule.day][gymName]) {
                        tempTasks[schedule.day][gymName] = [];
                    }

                    tempTasks[schedule.day][gymName].push(equipmentName);
                });

                Object.keys(tempTasks).forEach(day => {
                    Object.keys(tempTasks[day as Day]).forEach(gymName => {
                        const equipmentList = tempTasks[day as Day][gymName].map(equipment => `<li>${equipment}</li>`).join('');
                        tasksFromDb[day as Day] += `${gymName}
                            <ul>
                                ${equipmentList}
                            </ul>`;
                    });
                });

                setTasks(tasksFromDb);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchSchedules();
    }, [API]);

    const getGymID = (gym: string | null) => {
        if (!gym) return null;
        for (const key in gyms) {
            const numericKey = parseInt(key);
            if (gyms[numericKey] === gym) {
                return numericKey;
            }
        }
        return null;
    };
    
    const getEquipmentIDs = (equipments: string[]) => {
        const equipmentIDs: number[] = [];
        for (const equipment of equipments) {
            for (const key in gymEquipment) {
                const numericKey = parseInt(key);
                if (gymEquipment[numericKey] === equipment) {
                    equipmentIDs.push(numericKey);
                }
            }
        }
        return equipmentIDs;
    };

    const mapGymIDAndEquipmentIDs = (gymID: number, equipmentIDs: number[]): Record<number, number>[] => {
        return equipmentIDs.map(equipmentID => ({ [gymID]: equipmentID }));
    };    
    
    const createschedule = async (day: Day, gymID: number, equipmentIDs: number[]) => {
        await axios.post(API + "/user/create-schedule", {
            day: day,
            gymID: gymID,
            equipmentIDs: equipmentIDs 
        });
    };

    const handleAddClick = async () => {
        if (filterSelection.gym && filterSelection.equipments.length > 0) {
            const newTask = `${filterSelection.gym}
                                <ul>
                                    ${filterSelection.equipments.map(equipment => `<li>${equipment}</li>`).join('')}
                                </ul>`;
            setTasks(prevTasks => ({
                ...prevTasks,
                [currentDay]: newTask
            }));
            const gymID = getGymID(filterSelection.gym);
            if (gymID !== null) {
                const equipmentIDs = getEquipmentIDs(filterSelection.equipments);
                await createschedule(currentDay, gymID, equipmentIDs);
            }
        };
    }

    const handleFilterChange = (selection: FilterSelection) => {
        setFilterSelection(selection);
    };

    return (
        <div>
            <Hello />
            <Timetable tasks={tasks} />
            <Filter onFilterChange={handleFilterChange}/>
            {filterSelection.equipments.length > 0 && (
                <div className="update-section">
                    <select value={currentDay} onChange={(e) => setCurrentDay(e.target.value as Day)}>
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <button onClick={handleAddClick}>Update</button>
                </div>
            )}
            
        </div>
    );
};

export default DashboardPage;