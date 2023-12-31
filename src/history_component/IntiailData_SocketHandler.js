
import { io } from "socket.io-client";
import enviorment_variables from "../enviorment_variables";

//take the url from enviorment variables file . 
const SERVER_URL = enviorment_variables.Server_URL;

const socket = io.connect(SERVER_URL);

const handleGetDroneTypes_And_TableData = (setDroneTypes, setTableData) => {

    //connect to the url from backend to take data .

    socket.emit('get_initial_data');

    const handleResponse = (data) => {
        setDroneTypes(data.droneTypes);
        setTableData(data.initial_data)
        // console.log(data.initial_data);
    }

    socket.on('initial_data_response', handleResponse);

    //return a cleanup function

    const cleanupSocket = () => {
        socket.off('initial_data_response', handleResponse);

    };
    return cleanupSocket;
};








export { handleGetDroneTypes_And_TableData };