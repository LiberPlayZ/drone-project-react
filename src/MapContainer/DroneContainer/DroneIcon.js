import L from 'leaflet';
import droneIconImage from './drone.png'

const DroneIcon = L.icon({
    iconUrl:droneIconImage,
    iconSize:[32,32],
    iconAnchor:[16,16],
});

export default DroneIcon;