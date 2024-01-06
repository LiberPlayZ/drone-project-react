import React from "react";
import MapContainer_component from "../MapContainer/MapContainer";
import { useNavigate,useParams } from "react-router-dom";


const Play_Flight = () => {
    const {flightId} = useParams();
    return (
        <div>
            <h1>Map of Israel</h1>
            <h1>flightId:{flightId}</h1>
            <MapContainer_component></MapContainer_component>
        </div>
    );
};

export default Play_Flight; 