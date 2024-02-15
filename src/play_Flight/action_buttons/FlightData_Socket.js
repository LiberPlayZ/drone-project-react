import { io } from 'socket.io-client'
import enviorment_variables from '../../enviorment_variables'
import { checkCookieExist } from '../../login_register/checkCookie';

const Server_URL = enviorment_variables.Server_URL;




const Flight_Socket = (flightId, setMessage, setReceiveData) => {
    const socket = io.connect(Server_URL);
    const existCookie = checkCookieExist();
    socket.emit(enviorment_variables.Send_Filght_Url, flightId, existCookie);


    // Listen for receive data
    socket.once(enviorment_variables.Recieve_Filght_data_Url, (data) => {
        if (data.error) {
            setMessage('Authentication failed , please log in.');
            localStorage.removeItem('session_token');
        }
        else {
            setReceiveData(data);
        }
    });

    return socket;
};

export default Flight_Socket;

