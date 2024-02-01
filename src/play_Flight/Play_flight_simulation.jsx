import React, { useEffect, useState } from "react";
import MapContainerComponent from "../MapContainer/MapContainer";
import { useParams, useNavigate } from "react-router-dom";
import ActionButtonsHanlder from './action_buttons/Action_Buttons_Handler';
import Flight_Socket from "./action_buttons/FlightData_Socket";
import Button from '@mui/material/Button';
import { IoReturnUpForward } from "react-icons/io5";
import { styled } from "@mui/system";


const BackButtonStyle = styled('div')({

    margin: 10,
});




const Play_Flight = () => {
    const navigate = useNavigate();
    const { flightId } = useParams(); // retrieve the choosen  flightId from history page. 
    const [flightData, setFlightData] = useState([]); // variable for flightData.
    const [simulationStarted, setsimulationStarted] = useState(false); // variable to see if simulation started .
    const [backward_forward_delta, setbackWard_forward_delta] = useState(0); // variable for controller , -1 - backward , 1 - forward
    const [currentDroneClick, setcurrentDroneClick] = useState(false); // state for current buttton click . 
    const [buttondisabled, setbuttondisabled] = useState(true); //state for disable the button when simulation didnt start. 
    const [message, setMessage] = useState('loading data ...');

    const handleBackButtonClick = () => { // handle back button click to move back to history page . 
        navigate(-1);
    }

    const handleCurrentDronenClick = () => { // handle Current drone click to triger child component .  
        setcurrentDroneClick(true);
    }

    const play_simulation = () => { //handle play pause click.
        setsimulationStarted(!simulationStarted);
    }
    const forward_simulation = () => { //handle forward button click . 
        setbackWard_forward_delta(1);
    }
    const back_forward_simulation = () => { //handle back forward click .
        setbackWard_forward_delta(-1);
    }



    useEffect(() => {


        if (currentDroneClick) {
            setbuttondisabled(false);
        }
        const socket = Flight_Socket(flightId, setMessage, (data) => {
            setFlightData(data);
        });
        // console.log(flightData);

        // console.log(backward_forward_delta);

        return () => {
            socket.disconnect();
        };

    }, [flightId, setFlightData, currentDroneClick]);


    if (flightData.length === 0) {
        return <a href="/LoginPage" style={{ display: 'flex', fontSize: '40px', alignItems: 'center', justifyContent: 'center' }}>{message}</a>;
    }




    return (
        <div>
            {/* <h1>Map of Israel</h1> */}
            {/* <h1>flightId:{flightId}</h1> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <BackButtonStyle>
                    <Button variant="contained" disabled={buttondisabled} onClick={handleCurrentDronenClick}>
                        Current Drone
                    </Button>
                </BackButtonStyle>


                <BackButtonStyle>
                    <Button variant="contained" endIcon={<IoReturnUpForward />} onClick={handleBackButtonClick}>
                        Back
                    </Button>
                </BackButtonStyle>
            </div>

            <MapContainerComponent
                dronesData={flightData}
                simulationStarted={simulationStarted}
                backward_forward_delta={backward_forward_delta}
                setbackward_forward_delta={setbackWard_forward_delta}
                currentButtonClick={currentDroneClick}
                setcurrentButtonClick={setcurrentDroneClick}
                setButtonDisabled={setbuttondisabled}>

            </MapContainerComponent>

            <ActionButtonsHanlder
                handlePlay_Pause={play_simulation}
                changeIconByPress={simulationStarted}
                handleBackForward={back_forward_simulation}
                handleForward={forward_simulation}>

            </ActionButtonsHanlder>

        </div>
    );
};

export default Play_Flight; 