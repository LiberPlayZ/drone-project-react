import { useEffect } from "react";
import { io } from "socket.io-client";
import enviorment_variables from "./enviorment_variables";

//take the url from enviorment variables file . 
const SERVER_URL = enviorment_variables.Server_URL;

const SocketManager = ({ ondataUpdate }) => {
    useEffect(() => {
        const socket = io.connect(SERVER_URL);
        //connect to the url from backend to take data .
        socket.on('get_drone_data', (data) => {
            ondataUpdate(data);
            console.log('data', data)

        });
   

        return () => {
            socket.disconnect();
        };


    }, [ondataUpdate]);
    return null;
};

export default SocketManager;