// useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import enviorment_variables from '../enviorment_variables';

const SOCKET_URL = enviorment_variables.Server_URL;

const SendAndReceive_Socket = (sendData, setReceiveData, sendUrl, receiveUrl) => {
  useEffect(() => {
    const socket = io.connect(SOCKET_URL);

    // Send Data
    socket.emit(sendUrl, sendData);

    // Listen for receive data
    socket.on(receiveUrl, (data) => {
      // console.log(data);
      setReceiveData(data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [sendData, setReceiveData, sendUrl, receiveUrl]);
};

export default SendAndReceive_Socket;
