import React from 'react';
import './MapContainer.css';
import "leaflet/dist/leaflet.css";
import enviorment_variables from '../enviorment_variables';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import israelPolygon from './IsraelPolygonFile';
// import L from 'leaflet'

const MapContainer_component = () => {
    const center = enviorment_variables.Israel_cordinates;
    const zoom = enviorment_variables.Map_zoom;
    const url = enviorment_variables.TitleLayer_url;
    const attribution = enviorment_variables.TitleLayer_atribution;

    const created = (e) => { // function to  save drawnn pokygon cordinates.
        const p = e.layer._latlngs[0].map((latLng) => [latLng.lat, latLng.lng]);
        console.log(p);
    }

    return (

        <MapContainer center={center} zoom={zoom}>
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
            <Polygon positions={israelPolygon.geometry.coordinates}>
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
}


export default MapContainer_component;