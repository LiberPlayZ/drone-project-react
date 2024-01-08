import { io } from 'socket.io-client'
import enviorment_variables from '../../enviorment_variables'

const Server_URL = enviorment_variables.Server_URL;




const Flight_Socket = (flightId, setReceiveData) => {
    const socket = io.connect(Server_URL);
    socket.emit(enviorment_variables.Send_Filght_Url, flightId);


    // Listen for receive data
    socket.on(enviorment_variables.Recieve_Filght_data_Url, (data) => {
        // console.log(data);
        setReceiveData(data);
    });

    return  socket;
};

export default Flight_Socket;

