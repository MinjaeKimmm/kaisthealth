import React from 'react';
import './Timetable.css';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface TimetableProps {
    tasks: Record<Day, string>;
}

const Timetable: React.FC<TimetableProps> = ({ tasks }) => {
    const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="timetable">
            <div className="header-row">
                {days.map(day => (
                    <div key={day} className="header-cell">
                        {day}
                    </div>
                ))}
            </div>
            <div className="body-row">
                {days.map(day => (
                    <div key={day} className="body-cell">
                        <div className="gym-name" dangerouslySetInnerHTML={{ __html: tasks[day].split('<ul>')[0] }} />
                        <div dangerouslySetInnerHTML={{ __html: tasks[day].includes('<ul>') ? tasks[day].split('<ul>')[1] : '' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timetable;
