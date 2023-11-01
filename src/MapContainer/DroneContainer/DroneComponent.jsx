import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import droneiconImage from './drone.png';


const DroneComponent = ({ drone }) => {

    const droneIcon = new L.icon({
        iconUrl: droneiconImage,
        iconSize: [32, 32],
        iconAnchor: [16, 16]

    });
    const [positionIndex, setPositionIndex] = useState(0);

    const updatePosition = () => { //  function for update position in route array . 
        setPositionIndex((prevIndex) => {
            if (prevIndex < drone.route.length - 1) {
                return prevIndex + 1;
            }
            else {
                return 0;
            }
            
        });
    };

    useEffect(() => {
        const interval = setInterval(updatePosition, 2000); // Move every 2 second
        return () => clearInterval(interval);
    }, [drone.route]);

    const currentWaypoint = drone.route[positionIndex];
    const { latitude, longitude } = currentWaypoint;

    return (
        <Marker position={[latitude, longitude]}icon={droneIcon}>

        </Marker>
    );
};




export default DroneComponent;