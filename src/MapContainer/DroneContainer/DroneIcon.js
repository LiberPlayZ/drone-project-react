import L from 'leaflet';
import droneIconImage from './drone.png'
import selectedDroneIconImage from './droneSelected.png';

const DroneIcon = L.icon({
    iconUrl: droneIconImage,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});


const SelectedDroneIcon = L.icon({
    iconUrl: selectedDroneIconImage,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

export { DroneIcon, SelectedDroneIcon };