import { useEffect } from 'react';
import { io } from 'socket.io-client';
import enviorment_variables from '../enviorment_variables';

const SOCKET_URL = enviorment_variables.Server_URL

const FilterSocket = (filterCriteria, setFlights) => {
  useEffect(() => {
    const socket = io.connect(SOCKET_URL);

    // Send initial filter criteria to the backend when the component mounts
    socket.emit('filter_criteria', filterCriteria);

    // Listen for filtered data from the backend
    socket.on('filtered_data', (filteredData) => {
      // Update your flight state with the filtered data
      setFlights(filteredData);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [filterCriteria, setFlights]);
};

export default FilterSocket;
