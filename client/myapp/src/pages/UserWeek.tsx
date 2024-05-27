import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/GalleryView/Card';
import '../components/GalleryView/Card.css';
import './UserWeek.css'

interface GymEquipment {
    [key: string]: string;
}

const gymEquipment: GymEquipment = { "crossover": "Cable Crossover Machine", "inversion": "Motorized Inversion Table", "latpulldown": "Lat Pulldown Machine", "butterfly": "Butterfly Machine", "abdominal": "Abdominal Crunch Machine", "flatchestpress": "Flat Bench Press Machine", "legpress": "Seated Leg Press Machine", "legextension": "Leg Extension Machine", "adductor": "Inner Thigh Machine", "legcurl": "Leg Curl Machine", "torsorotation": "Torso Rotation Machine", "inclinedchestpress": "Incline Bench Press Machine", "treadmill": "Treadmill", "elliptical": "Elliptical Stepper", "beltmassager": "Vibrating Belt Massager", "spinbike": "Spin Bike", "situp": "Sit-up Bench", "dumbbells": "Dumbbells", "benchpress": "Bench Press Station", "smith": "Smith Machine", "squatrack": "Squat Rack", "dipsmachine": "Dip Station", "curlbar": "Curl Bar", "standinghipabduction": "Standing Hip Abduction Machine", "stepper": "Stepper", "longpull": "Seated Row Machine", "preachercurl": "Preacher Curl Bench", "pulley": "Cable Pulley Machine", "shoulderraise": "Shoulder Press Machine", "calfraise": "Standing Calf Raise Machine", "pushup": "Push-up Bars", "deadlift": "Deadlift Blocks", "trapbar": "Trap Bar", "sandbag": "Heavy Bag", "hyperextension": "Hyperextension Bench", "abductor": "Hip Abduction Machine", "pullup": "Pull-up Bar", "inclinedbench": "Incline Bench", "hulahoop": "Hula Hoop", "jumprope": "Jump Rope", "kettlebells": "Kettlebells", "mat": "Exercise Mat", "bench": "Flat bench", "dietmachine": "Diet Machine" };

interface WeekInfo {
    day: string;
    gymName: string;
    equipmentName: string;
    type: string;
    largerBodyPart: string;
    targetArea: string[];
}

interface DayEquipment {
    gymName: string;
    equipmentName: string;
    fullEquipmentName: string;
    type: string;
    largerBodyPart: string;
    targetArea: string[];
}

const getWeekEquipment = (weekInfoList: WeekInfo[]) => {
    const daysOfWeek: { [key: string]: DayEquipment[] } = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    };

    weekInfoList.forEach((info) => {
        const { day, gymName, equipmentName, type, largerBodyPart, targetArea } = info;
        const fullEquipmentName = gymEquipment[equipmentName] || equipmentName;
        if (daysOfWeek[day]) {
            daysOfWeek[day].push({ gymName, equipmentName, fullEquipmentName, type, largerBodyPart, targetArea });
        }
    });

    return daysOfWeek;
};

const UserWeekPage = () => {
    const [weekEquipment, setWeekEquipment] = useState<{ [key: string]: DayEquipment[] }>({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });

    const getDetailedSchedule = async () => {
        const API = process.env.REACT_APP_API;
        const response = await axios.get(API + `/user/getDetailedSchedule`, {
            withCredentials: true
        });

        const weekInfoList: WeekInfo[] = response.data;
        const organizedEquipment = getWeekEquipment(weekInfoList);
        setWeekEquipment(organizedEquipment);
    };

    useEffect(() => {
        getDetailedSchedule();
    }, []);

    return (
        <div className="user-week-page">
            <h1>User Week Page</h1>
            {Object.keys(weekEquipment).map((day) => (
                <div key={day}>
                    <h2>{day}</h2>
                    <div className="card">
                        {weekEquipment[day].map((equipment, index) => (
                            <Card
                                key={index}
                                equipmentName={equipment.equipmentName}
                                fullEquipmentName={equipment.fullEquipmentName}
                                gymName={equipment.gymName}
                                type={equipment.type}
                                largerBodyPart={equipment.largerBodyPart}
                                targetArea={equipment.targetArea.join(', ')}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserWeekPage;
