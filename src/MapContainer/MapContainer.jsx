import React, { useState, useEffect } from 'react';
import './MapContainer.css';
import "leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup, Marker, Tooltip, Polyline } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import israelPolygon from './IsraelPolygonFile';
import { SelectedDroneIcon, EndPoint, StartPoint, DroneIconClear, DroneIconDanger } from './DroneContainer/DroneIcon';


const MapContainerComponent = ({ dronesData, simulationStarted, backward_forward_delta, currentButtonClick, setbackward_forward_delta, setcurrentButtonClick, setButtonDisabled }) => { //component for the Israel map with polygon .
    const [currentZoom, setCurrentZoom] = useState(enviorment_variables.Map_zoom); // hook for zoom level in the map . 
    const [currentDroneIndex, setCurrentDroneIndex] = useState(0);
    const center = enviorment_variables.Israel_cordinates;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;
    const [mapObject, setmapObject] = useState(null);
    const dronesDataLength = dronesData.length;
    const [showEndPoint, setShowEndPoint] = useState(false);



    const createMapWithPolylines = () => {
        const polylines = [];

        // Iterate through the array of markers to create polylines
        for (let i = 0; i < dronesDataLength - 1; i++) {
            const startPoint = dronesData[i];
            const endPoint = dronesData[i + 1];

            // Create positions for the Polyline using lat and lng properties of startPoint and endPoint
            const positions = [[startPoint.latitude, startPoint.longitude], [endPoint.latitude, endPoint.longitude]];

            // Create a Polyline between current marker and the next one
            const polyline = (
                <Polyline
                    key={`polyline-${i}`}
                    positions={positions}
                    color="black"
                />
            );

            // Add the Polyline to the array
            polylines.push(polyline);
        }
        return polylines;
    }

    const handleMarkerCLick = (map, lat, long) => { //function to handle current Drone position and zoom on it . 
        setButtonDisabled(false);
        setShowEndPoint(true);
        setmapObject(map);
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
            handleMarkerCLick(mapObject, dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude);
            setbackward_forward_delta(0);
        }
        else if (backward_forward_delta === 1) {
            setCurrentDroneIndex((prevIndex) => (prevIndex + 1) % dronesData.length);
            handleMarkerCLick(mapObject, dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude);
            setbackward_forward_delta(0);

        }

        if (currentButtonClick) {
            handleMarkerCLick(mapObject, dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude);
            setcurrentButtonClick(false);


        }
        if (!simulationStarted) {
            setButtonDisabled(true);
        }

        return () => {
            clearInterval(interval)
            // map.off('move', handleMapMove);
        };

    }, [dronesData, simulationStarted, backward_forward_delta, setbackward_forward_delta, currentButtonClick, setcurrentButtonClick]);


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
            {showEndPoint && <Marker
                key={'starting point'}
                position={[dronesData[0].latitude, dronesData[0].longitude]}
                icon={StartPoint}
            ></Marker>}
            {showEndPoint && (
                <Marker
                    key={'ending point'}
                    position={[dronesData[dronesDataLength - 1].latitude, dronesData[dronesDataLength - 1].longitude]}
                    icon={EndPoint}
                ></Marker>)}

            {
                createMapWithPolylines()
            }
            {simulationStarted && currentDroneIndex < dronesData.length && (
                <Marker
                    key={`current-drone`}
                    position={[dronesData[currentDroneIndex].latitude, dronesData[currentDroneIndex].longitude]}
                    icon={dronesData[currentDroneIndex].prediction > 0.5 ? DroneIconDanger : SelectedDroneIcon}
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












