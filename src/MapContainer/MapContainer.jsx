import React, { useState, useEffect } from 'react';
import './MapContainer.css';
import "leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup, Marker, Tooltip } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import israelPolygon from './IsraelPolygonFile';
import { DroneIcon, SelectedDroneIcon } from './DroneContainer/DroneIcon';


const MapContainerComponent = ({ dronesData = [], simulationStarted, backward_forward_delta, setbackward_forward_delta }) => { //component for the Israel map with polygon .
    const [currentZoom, setCurrentZoom] = useState(enviorment_variables.Map_zoom); // hook for zoom level in the map . 
    const [currentDroneIndex, setCurrentDroneIndex] = useState(0);
    const center = enviorment_variables.Israel_cordinates;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;




    const handleMarkerCLick = (map, lat, long) => { //function to handle current Drone position and zoom on it . 
        if (map) {
            map.flyTo([lat, long], 18);
        }
    }


    const created = (e) => { // function to  save drawn polygon cordinates.
        const p = e.layer._latlngs[0].map((latLng) => [latLng.lat, latLng.lng]);
        console.log(p);
    }


    useEffect(() => {


        if (dronesData.length === 0) {
            return; // No data, nothing to simulate
        }

        const interval = setInterval(() => {
            setCurrentDroneIndex((prevIndex) => (prevIndex + 1) % dronesData.length);
        }, 3000);

        if (backward_forward_delta === -1) {
            if (currentDroneIndex > 0)
                setCurrentDroneIndex((prevIndex) => (prevIndex - 1) % dronesData.length);
            else
                setCurrentDroneIndex(dronesData.length - 1);
            setbackward_forward_delta(0);
        }
        else if (backward_forward_delta === 1) {
            setCurrentDroneIndex((prevIndex) => (prevIndex + 1) % dronesData.length);
            setbackward_forward_delta(0);

        }
        return () => clearInterval(interval);

    }, [dronesData, simulationStarted, backward_forward_delta, setbackward_forward_delta]);


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
                    {/* <Tooltip
                        direction='left'
                        offset={[-45, 0]}
                        permanent
                    >{`Drone ${index}`}</Tooltip> */}
                    <Popup>{`Drone ${index}`}</Popup>
                </Marker>
            ))}
            {!simulationStarted && currentDroneIndex < dronesData.length && (
                <Marker
                    key={`current-drone`}
                    position={[dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude]}
                    icon={SelectedDroneIcon}
                    eventHandlers={{
                        click: (e) => handleMarkerCLick(e.target._map, dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude)
                    }}
                >
                    <Tooltip
                        direction='right'
                        offset={[40, 0]}
                        permanent
                    >
                        <div className='toolTip_current'>
                            <b>current Drone</b>
                        </div></Tooltip>
                </Marker>
            )}


                //polygon of Israel .

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


export default MapContainerComponent;












