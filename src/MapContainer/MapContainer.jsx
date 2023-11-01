import React, { useState, useEffect } from 'react';
import './MapContainer.css';
import "leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import israelPolygon from './IsraelPolygonFile';
import drones from './DroneContainer/drones';
import DroneComponent from './DroneContainer/DroneComponent';
// import L from 'leaflet'

const MapContainer_component = () => { //component for the Israel map with polygon .
    const [currentZoom, setCurrentZoom] = useState(enviorment_variables.Map_zoom); // hook for zoom level in the map . 
    const [ActiveDrone, setActiveDrone] = useState(false); // hook for active the drones component
    const center = enviorment_variables.Israel_cordinates;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;
  


    // const updateZoom = (e) => {
       
    //     const zoomlevel=e.target.getZoom();
    //     setCurrentZoom(zoomlevel)
    //     console.log(zoomlevel);
    //     zoomlevel >=9 ? setActiveDrone(true):setActiveDrone(false);
       
    // };

    useEffect(() => {
        const delay = 5000; // 5 seconds delay
        const delayTimer =setTimeout(()=>{
            setActiveDrone(true);
        },delay)
        return ()=>clearTimeout(delayTimer);
    }, []);






    const created = (e) => { // function to  save drawnn pokygon cordinates.
        const p = e.layer._latlngs[0].map((latLng) => [latLng.lat, latLng.lng]);
        console.log(p);
    }
    // console.log(drones);

    return (

        <MapContainer center={center} zoom={currentZoom}>
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
            {  
                ActiveDrone&&
                drones.map((drone)=>(
                    <DroneComponent key={drone.id} drone={drone}></DroneComponent>
                    
                ))}
                
            
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