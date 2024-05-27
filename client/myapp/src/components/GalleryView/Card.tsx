import React from 'react';
import './Card.css';

type CardProps = {
  equipmentName: string;
  fullEquipmentName: string;
  gymName: string;
  type: string;
  largerBodyPart: string;
  targetArea: string;
};

const getBackgroundImageStyle = (gymName: string, equipmentName: string) => {
  return { backgroundImage: `url(${process.env.PUBLIC_URL}/img/Gyms/${gymName}/${equipmentName}.jpg)` };
};

const Card: React.FC<CardProps> = ({ equipmentName, fullEquipmentName, gymName, type, largerBodyPart, targetArea }) => {
  return (
      <div className="col">
        <div className="container">
          <div className="front" style={getBackgroundImageStyle(gymName, equipmentName)}>
            <div className="inner">
              <p>{fullEquipmentName}</p>
              <span>{gymName}</span>
            </div>
          </div>
          <div className="back">
            <div className="inner">
              <p className="label">Type: </p>
              <p>{type}</p>
              <p className="label">Body Part: </p>
              <p>{largerBodyPart}</p>
              <p className="label">Target Area: </p>
              <p>{targetArea}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
