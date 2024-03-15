// useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import enviorment_variables from '../enviorment_variables';


const SOCKET_URL = enviorment_variables.Server_URL;

const SendAndReceive_Socket = (sendData, setReceiveData,setIsAdmin,sendUrlOnChange, receiveUrlOnChange,loaded,setloaded,setDroneTypes,setMessage) => {
  const socket = io(SOCKET_URL,{
    withCredentials:true
  });

  useEffect(() => {
   

    if(loaded){
      socket.emit('get_initial_data');



      socket.once('initial_data_response', (data) => {
        if(data.error){
          setMessage('Authentication failed , please log in.');
        
        }
        else
          handleResponse(data, setDroneTypes, setReceiveData,setIsAdmin)
      });
      
      return () => {
        socket.off('initial_data_response');
        setloaded(false);
      };
     
    }
    else{
    // Send Data
    socket.emit(sendUrlOnChange, sendData);

    // Listen for receive data
    socket.on(receiveUrlOnChange, (data) => {
      // console.log(data);
      setReceiveData(data);
    });
  

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off(receiveUrlOnChange);
    };
  }
  }, [sendData,loaded]);
};

const handleResponse = (data, setDroneTypes, setTableData,setIsAdmin) => {
  console.log(data);
  setDroneTypes(data.droneTypes);
  setTableData(data.initial_data);
  setIsAdmin(data.Role)
  // console.log(data.initial_data);
}


export default SendAndReceive_Socket;
