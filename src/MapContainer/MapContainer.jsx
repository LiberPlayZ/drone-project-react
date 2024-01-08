import React, { useState, useEffect } from 'react';
import './MapContainer.css';
import "leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import israelPolygon from './IsraelPolygonFile';
import DroneComponent from './DroneContainer/DroneComponent';
import L from 'leaflet'

const MapContainer_component = ({ dronesData }) => { //component for the Israel map with polygon .
    const [currentZoom, setCurrentZoom] = useState(enviorment_variables.Map_zoom); // hook for zoom level in the map . 
    // const [ActiveDrone, setActiveDrone] = useState(false); // hook for active the drones component
    const [map, setMap] = useState(null)
    const center = enviorment_variables.Israel_cordinates;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;


    const handleMapReady = (map) => { // handle when map is ready . 
        setMap(map);
    };


    const created = (e) => { // function to  save drawn polygon cordinates.
        const p = e.layer._latlngs[0].map((latLng) => [latLng.lat, latLng.lng]);
        console.log(p);
    }
    // console.log(drones);


    // useEffect(() => {
    //     if (map && dronesData.length > 0) {
    //         // Periodically update drone positions on the map
    //         const intervalId = setInterval(() => {
    //             // Clear existing markers
    //             map.eachLayer((layer) => {
    //                 if (layer instanceof L.Marker) {
    //                     map.removeLayer(layer);
    //                 }
    //             });

    //             // Add new markers based on dronesData
    //             dronesData.forEach((droneData) => {
    //                 map.addLayer(<DroneComponent key={droneData.drone_id} droneData={droneData} />);
    //             });
    //         }, 2000);

    //         // Clean up the interval when the component unmounts
    //         return () => clearInterval(intervalId);
    //     }
    // }, [map, dronesData]);


    return (

        <MapContainer center={center} zoom={currentZoom} whenReady={handleMapReady}>
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













// { //active the drone animation after short delay.
//     ActiveDrone &&
//     drones.map((drone) => (
//         <DroneComponent key={drone.id} drone={drone}></DroneComponent>

//     ))}