import React from 'react';
import axios from 'axios';

const gymEquipment = { "crossover": "Cable Crossover Machine", "inversion": "Motorized Inversion Table", "latpulldown": "Lat Pulldown Machine", "butterfly": "Butterfly Machine", "abdominal": "Abdominal Crunch Machine", "flatchestpress": "Flat Bench Press Machine", "legpress": "Seated Leg Press Machine", "legextension": "Leg Extension Machine", "adductor": "Inner Thigh Machine", "legcurl": "Leg Curl Machine", "torsorotation": "Torso Rotation Machine", "inclinedchestpress": "Incline Bench Press Machine", "treadmill": "Treadmill", "elliptical": "Elliptical Stepper", "beltmassager": "Vibrating Belt Massager", "spinbike": "Spin Bike", "situp": "Sit-up Bench", "dumbbells": "Dumbbells", "benchpress": "Bench Press Station", "smith": "Smith Machine", "squatrack": "Squat Rack", "dipsmachine": "Dip Station", "curlbar": "Curl Bar", "standinghipabduction": "Standing Hip Abduction Machine", "stepper": "Stepper", "longpull": "Seated Row Machine", "preachercurl": "Preacher Curl Bench", "pulley": "Cable Pulley Machine", "shoulderraise": "Shoulder Press Machine", "calfraise": "Standing Calf Raise Machine", "pushup": "Push-up Bars", "deadlift": "Deadlift Blocks", "trapbar": "Trap Bar", "sandbag": "Heavy Bag", "hyperextension": "Hyperextension Bench", "abductor": "Hip Abduction Machine", "pullup": "Pull-up Bar", "inclinedbench": "Incline Bench", "hulahoop": "Hula Hoop", "jumprope": "Jump Rope", "kettlebells": "Kettlebells", "mat": "Exercise Mat", "bench": "Flat bench", "dietmachine": "Diet Machine" };

interface BannerProps {
    gymName: string;
}

export const Banner: React.FC<BannerProps> = ({ gymName }) => {
    const bannerImage = `/img/Gyms/${gymName}/${gymName}.jpg`;
    return (
        <div className="home-banner">
            <img src={bannerImage} className="background-image" alt={`${gymName} Banner`} />
        </div>
    );
};

export const getGymInfo = async (gymID: number) => {
    const API = process.env.REACT_APP_API;
    try {
        const response = await axios.get(`${API}/public/getGym`, {
            params: { gymID }
        });
        const equipmentList: string[] = response.data;
        return equipmentList;
    } catch (error) {
        console.error("Error fetching equipment list:", error);
        throw error;
    }
};
