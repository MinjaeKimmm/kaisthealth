import { useState } from "react";
import "./Accordian.css";

interface Equipment {
    equipmentName: string;
    type: string;
    targetArea: string[];
}

interface AccordianProps {
    items: Equipment[];
}

export const Accordian: React.FC<AccordianProps> = ({ items }) => {
    const [active, setActive] = useState(0);

    const handleToggle = (index: number) => setActive(index);

    return (
        <div className="Accordian">
            <div
                className="image-accordion-background"
                style={{ backgroundImage: `url(/img/Equipments/${items[active].equipmentName}.jpeg)` }}
            ></div>
            <div className="image-accordion">
                {items.map((item, index) => {
                    const isActive = active === index ? "active" : "";
                    return (
                        <div
                            key={index} 
                            className={`image-accordion-item ${isActive}`}
                            onClick={() => handleToggle(index)}
                        >
                            <img src={`/img/Equipments/${item.equipmentName}.jpeg`} alt={item.equipmentName} />
                            <div className="content">
                                <span className="material-symbols-outlined">{item.type}</span>
                                <div>
                                    <h2 className="equipmentName">{item.equipmentName}</h2>
                                    <p className="targetAreas">{item.targetArea.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Accordian;
