import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L, { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import droneiconImage from './drone.png';

//create icon for the drone .
const droneIcon = new L.icon({
    iconUrl: droneiconImage,
    iconSize: [32, 32],
    iconAnchor: [16, 16]

});

const DroneComponent = ({ droneData }) => {

    if (!droneData) {
        console.log('nuldassdal');
        return null;

    }
    else
        // console.log(droneData)

        //return new marker with the drone icon and latitude and longitude for the map .
        return (
            <Marker position={[droneData.latitude, droneData.longitude]} icon={droneIcon}>
                <Popup>{`Drone ${droneData.drone_id} - Lat: ${droneData.latitude}, Long: ${droneData.longitude}`}</Popup>
            </Marker>
        );
};




export default DroneComponent;














// const DroneComponent = ({ drone }) => {



//     const [positionIndex, setPositionIndex] = useState(0);

//     const updatePosition = () => { //  function for update position in route array .
//         setPositionIndex((prevIndex) => {
//             if (prevIndex < drone.route.length - 1) {
//                 return prevIndex + 1;
//             }
//             else {
//                 return 0;
//             }

//         });
//     };

//     useEffect(() => {
//         const interval = setInterval(updatePosition, 2000); // Move every 2 second
//         return () => clearInterval(interval);
//     }, [drone.route]);

//     const currentWaypoint = drone.route[positionIndex];
//     const { latitude, longitude } = currentWaypoint;

//     return (
//         <Marker position={[latitude, longitude]} icon={droneIcon}>

//         </Marker>
//     );
// };
