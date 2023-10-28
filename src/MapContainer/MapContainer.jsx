import React from 'react';
import './MapContainer.css';
import"leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import {MapContainer,TileLayer} from 'react-leaflet'
// import L from 'leaflet'

const MapContainer_component = ()=>{
    const center = enviorment_variables.Israel_cordinates;
    const zoom = enviorment_variables.Map_zoom;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;
    return (
       
        <MapContainer center ={center} zoom ={zoom}>
            <TileLayer
            url={url}
            attribution={attribution}
            />
        </MapContainer>
     
    );
}


export default MapContainer_component;