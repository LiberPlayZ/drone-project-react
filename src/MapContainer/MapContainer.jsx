import React, { useState, useEffect, useRef } from 'react';
import './MapContainer.css';
import "leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup, Marker, Tooltip, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import israelPolygon from './IsraelPolygonFile';
import DroneIcon from './DroneContainer/DroneIcon';
import L from 'leaflet';

const MapContainer_component = ({ dronesData = [] }) => { //component for the Israel map with polygon .
    const [currentZoom, setCurrentZoom] = useState(enviorment_variables.Map_zoom); // hook for zoom level in the map . 
    // const [ActiveDrone, setActiveDrone] = useState(false); // hook for active the drones component
    // const [map, setMap] = useState(null)
    const [currentDroneIndex, setCurrentDroneIndex] = useState(0);
    const mapRef = useRef(null);
    // const map = useMap();
    const center = enviorment_variables.Israel_cordinates;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;



    const handleMarkerCLick = (map, lat, long) => {
        if (map) {
            map.flyTo([lat, long], 18);
        }
    }


    const created = (e) => { // function to  save drawn polygon cordinates.
        const p = e.layer._latlngs[0].map((latLng) => [latLng.lat, latLng.lng]);
        console.log(p);
    }
    // console.log(drones);

    useEffect(() => {


        if (dronesData.length === 0) {
            return; // No data, nothing to simulate
        }


        const interval = setInterval(() => {
            setCurrentDroneIndex((prevIndex) => (prevIndex + 1) % dronesData.length);
        }, 3000);


        return () => clearInterval(interval);


    }, [dronesData]);


    return (

        <MapContainer
            center={center}
            zoom={currentZoom}
            doubleClickZoom={true}
            zoomAnimation={true} >
            <FeatureGroup>
                <EditControl position='topright' onCreated={created}
                    draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,

                    }}>

                </EditControl>
            </FeatureGroup>
            <TileLayer
                url={url}
                attribution={attribution}
            />
            {dronesData && dronesData.map((drone, index) => (
                <Marker key={index} position={[drone.latitude, drone.longitude]} icon={DroneIcon}>
                    <Tooltip
                        direction='left'
                        offset={[-30,0 ]}
                        permanent
                    >{`Drone ${index}`}</Tooltip>
                </Marker>
            ))}
            {currentDroneIndex < dronesData.length && (
                <Marker
                    key={`current-drone`}
                    position={[dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude]}
                    icon={DroneIcon}
                    eventHandlers={{
                        click: (e) => handleMarkerCLick(e.target._map, dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude)
                    }}
                >
                    <Tooltip
                        direction='right'
                        offset={[30,0 ]}
                        permanent
                    >
                        <div className='toolTip_current'>
                        <b>current Drone</b>
                        </div></Tooltip>
                </Marker>
            )}



            <Polygon positions={israelPolygon.geometry.coordinates} pathOptions={{ stroke: true, fill: false }}>
                <Popup>
                    <div className='israel-popup'>
                        <h2>{israelPolygon.properties.name}</h2>
                        <p>Capital: {israelPolygon.properties.capital}</p>
                        <p>Population: {israelPolygon.properties.population}</p>

                    </div>
                </Popup>
            </Polygon>


        </MapContainer>



    );
};


export default MapContainer_component;












