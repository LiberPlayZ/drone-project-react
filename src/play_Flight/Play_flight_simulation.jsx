import React, { useEffect, useState } from "react";
import MapContainer_component from "../MapContainer/MapContainer";
import { useParams, useNavigate } from "react-router-dom";
import Action_Buttons_Hnalder from "./action_buttons/Action_Buttons_Handler";
import Flight_Socket from "./action_buttons/FlightData_Socket";
import Button from '@mui/material/Button';
import { IoReturnUpForward } from "react-icons/io5";

import { styled } from "@mui/system";


const Back_Button_Style = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 10,
});


const Play_Flight = () => {
    const navigate = useNavigate();
    const { flightId } = useParams();
    const [flightData, setFlightData] = useState([]); // variable for flightData.
    const [playPressed, setplayPressed] = useState(false);
    const [simulationStarted, setsimulationStarted] = useState(false);


    const handleBackButtonClick = () => {
        navigate(-1);
    }


    const play_simulation = () => {
        console.log(flightData);
    }



    useEffect(() => {
        const socket = Flight_Socket(flightId, setFlightData);


        return () => {
            socket.disconnect();
        }


    }, []);



    return (
        <div>
            {/* <h1>Map of Israel</h1> */}
            {/* <h1>flightId:{flightId}</h1> */}

            <Back_Button_Style>
                <Button variant="contained" endIcon={<IoReturnUpForward />} onClick={handleBackButtonClick}>
                    Back
                </Button>
            </Back_Button_Style>

            {}
            <MapContainer_component DroneData={flightData}></MapContainer_component>
            <Action_Buttons_Hnalder handlePlay_Pause={play_simulation}></Action_Buttons_Hnalder>

        </div>
    );
};

export default Play_Flight; 