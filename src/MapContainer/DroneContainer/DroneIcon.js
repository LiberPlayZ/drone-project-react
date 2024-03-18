import L from 'leaflet';
import droneIconImage from './icons/drone.png'
import selectedDroneIconImage from './icons/droneSelected.png';
import endpoint from './icons/endPoint.png';
import startpoint from './icons/startpoint.png';
import drone_danger from './icons/drone_danger.png';
import drone_clear from './icons/drone_clear.png';

const DroneIcon = L.icon({
    iconUrl: droneIconImage,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});


const SelectedDroneIcon = L.icon({
    iconUrl: selectedDroneIconImage,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});
const DroneIconDanger = L.icon({
    iconUrl: drone_danger,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});
const DroneIconClear = L.icon({
    iconUrl: drone_clear,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const StartPoint = L.icon({
    iconUrl: startpoint,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

const EndPoint = L.icon({
    iconUrl: endpoint,
    iconSize: [40, 40],
    iconAnchor: [24, 24],
});

export { DroneIcon, SelectedDroneIcon,StartPoint,EndPoint,DroneIconClear,DroneIconDanger };