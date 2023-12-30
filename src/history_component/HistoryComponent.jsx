import React, { useState, useEffect } from "react";
import './HistoryComponent.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { handleGetDroneTypes_And_TableData } from './IntiailData_SocketHandler';
import FilterSocket from "./filterSocketHandler";


const HistoryComponent = () => {

    const [droneTypesData, setDroneTypesData] = useState([]); //variable for select droneType
    const [tableData, setTableData] = useState([]); // variable for table data
    const [filterSelect, setFilterSelect] = useState({ // variable for select on change .
        droneType: '',
        isDangerous: false,
    });

    //create the socket for select on change .
    FilterSocket(filterSelect, setTableData)


    useEffect(() => {
        const cleanupSocket = handleGetDroneTypes_And_TableData(setDroneTypesData, setTableData);



        return () => {
            cleanupSocket();
        };
    }, []);

    // Only render the component content when drone types data is available
    if (droneTypesData.length === 0 && tableData.length === 0) {
        return <p>Loading data...</p>;
    }

    return (
        <>
            <div className="filter-buttons">
                <FormControl style={{ marginRight: '10px', width: '140px' }}>
                    <InputLabel>Select 1</InputLabel>
                    <Select label='Select 1'>
                        {/* Add options if needed */}
                    </Select>
                </FormControl>
                <FormControl style={{ marginRight: '10px', width: '140px' }}>
                    <InputLabel> Drone Type</InputLabel>
                    <Select
                        label='DroneType'
                        value={filterSelect.droneType}
                        onChange={(e) => setFilterSelect({ ...filterSelect, droneType: e.target.value })}
                    >
                        {droneTypesData.map((droneType) => (
                            <MenuItem key={droneType} value={droneType}>
                                {droneType}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl style={{ marginRight: '10px', width: '140px' }}>
                    <InputLabel>Is Dangerous</InputLabel>
                    <Select
                        label='Is Dangerous'
                        value={filterSelect.isDangerous}
                        onChange={(e) => setFilterSelect({ ...filterSelect, isDangerous: e.target.value })}>
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Flight ID</th>
                            <th>Drone Type</th>
                            <th>Is Flight Dangerous</th>
                            <th>Show flight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((flight) => (
                            <tr key={flight.flightId}>
                                <td>{flight.flightId}</td>
                                <td>{flight.droneType}</td>
                                <td>{flight.isDangerous ? 'Yes' : 'No'}</td>
                                <td>
                                    <Button variant="contained" color="success">
                                        Show
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HistoryComponent;

//add in the git next commit fix the render of the component . 
