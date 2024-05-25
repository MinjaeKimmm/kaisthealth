import React, { useState } from 'react';
import Timetable from '../components/Dashboard/Timetable';
import Hello from '../components/Dashboard/Hello'
import Filter from '../components/Dashboard/Filter';
import "./Dashboard.css";

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface FilterSelection {
    sortBy: string | null;
    gym: string | null;
    equipments: string[];
}

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
    const [filterSelection, setFilterSelection] = useState<FilterSelection>({ sortBy: null, gym: null, equipments: [] })
    const [newText, setNewText] = useState('');

    const handleFilterChange = (selection: FilterSelection) => {
        setFilterSelection(selection);
    };

    const handleAddClick = () => {
        if (filterSelection.gym && filterSelection.equipments.length > 0) {
            const newTask = `${filterSelection.gym}
                                <ul>
                                    ${filterSelection.equipments.map(equipment => `<li>${equipment}</li>`).join('')}
                                </ul>`;
            setTasks(prevTasks => ({
                ...prevTasks,
                [currentDay]: newTask
            }));
        };
    }

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