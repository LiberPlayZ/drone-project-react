import L from 'leaflet';
import droneIconImage from './icons/drone.png'
import selectedDroneIconImage from './icons/droneSelected.png';
import endpoint from './icons/endPoint.png';
import startpoint from './icons/startpoint.png'

const DroneIcon = L.icon({
    iconUrl: droneIconImage,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});


const SelectedDroneIcon = L.icon({
    iconUrl: selectedDroneIconImage,
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
    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

export { DroneIcon, SelectedDroneIcon,StartPoint,EndPoint };