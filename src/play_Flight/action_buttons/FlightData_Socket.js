import { io } from 'socket.io-client'
import enviorment_variables from '../../enviorment_variables'


const Server_URL = enviorment_variables.Server_URL;




const Flight_Socket = (flightId, setMessage, setReceiveData) => {
    const socket = io(Server_URL,{
        withCredentials:true
    });
  
    socket.emit(enviorment_variables.Send_Filght_Url, flightId);


    // Listen for receive data
    socket.once(enviorment_variables.Recieve_Filght_data_Url, (data) => {
        if (data.error) {
            setMessage('Authentication failed , please log in.');
           
        }
        else {
            setReceiveData(data);
        }
    });

    return socket;
};

export default Flight_Socket;

