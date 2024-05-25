import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timetable from '../components/Dashboard/Timetable';
import Hello from '../components/Dashboard/Hello'
import Filter from '../components/Dashboard/Filter';
import "./Dashboard.css";

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const DashboardPage = () => {
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
    const [newText, setNewText] = useState('');

    const handleUpdate = () => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [currentDay]: newText
        }));
        setNewText('');
    };

    return (
        <div>
            <Hello />
            <Timetable tasks={tasks} />
            <div className="update-section">
                <select value={currentDay} onChange={(e) => setCurrentDay(e.target.value as Day)}>
                    {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={newText} 
                    onChange={(e) => setNewText(e.target.value)} 
                    placeholder="Enter new text" 
                />
                <button onClick={handleUpdate}>Update</button>
            </div>
            <Filter />
        </div>
    );
};

export default DashboardPage;