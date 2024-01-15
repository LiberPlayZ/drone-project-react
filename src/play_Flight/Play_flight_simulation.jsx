import React, { useEffect, useState } from "react";
import MapContainerComponent from "../MapContainer/MapContainer";
import { useParams, useNavigate } from "react-router-dom";
import ActionButtonsHanlder from './action_buttons/Action_Buttons_Handler';
import Flight_Socket from "./action_buttons/FlightData_Socket";
import Button from '@mui/material/Button';
import { IoReturnUpForward } from "react-icons/io5";
import { styled } from "@mui/system";


const BackButtonStyle = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 10,
});


const Play_Flight = () => {
    const navigate = useNavigate();
    const { flightId } = useParams(); // retrieve the choosen  flightId from history page. 
    const [flightData, setFlightData] = useState([]); // variable for flightData.
    const [simulationStarted, setsimulationStarted] = useState(true);
    const [backward_forward_delta, setbackWard_forward_delta] = useState(0); // variable for controller , -1 - backward , 1 - forward
    


    const handleBackButtonClick = () => { // handle back button click to move back to history page . 
        navigate(-1);
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


      
        const socket = Flight_Socket(flightId, (data) => {
            setFlightData(data);
        });
        // console.log(flightData);

        // console.log(backward_forward_delta);


        return () => {
            socket.disconnect();
        };

    }, [flightId, setFlightData]);


    if (flightData.length === 0) {
        return <p>Loading data...</p>;
    }




    return (
        <div>
            {/* <h1>Map of Israel</h1> */}
            {/* <h1>flightId:{flightId}</h1> */}

            <BackButtonStyle>
                <Button variant="contained" endIcon={<IoReturnUpForward />} onClick={handleBackButtonClick}>
                    Back
                </Button>
            </BackButtonStyle>

            <MapContainerComponent
                dronesData={flightData}
                simulationStarted={simulationStarted}
                backward_forward_delta={backward_forward_delta}
                setbackward_forward_delta={setbackWard_forward_delta}>

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