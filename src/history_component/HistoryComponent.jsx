import React, { useState, useEffect } from "react";
import './HistoryComponent.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Table_Component from './Table_Component';
import SendAndReceive_Socket from "./SendAndReceive_Socket";
import enviorment_variables from "../enviorment_variables";
import { useNavigate } from 'react-router-dom'

import Navbar from "../navbar/Navbar";



const HistoryComponent = () => {

    const [droneTypesData, setDroneTypesData] = useState([]); //variable for select droneType
    const [tableData, setTableData] = useState([]); // variable for table data
    const [currentPage, setCurrentPage] = useState(1); // variable for current page number
    const [loaded, setloaded] = useState(false); // variable for load page to check if user is logged in.
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('loading data...');
    const [filterSelect, setFilterSelect] = useState({ // variable for select on change .

        droneType: '',
        isDangerous: false,
    });

    const tableHeaders = ['Flight ID', 'Drone Type', 'Is Flight Dangerous', 'Show Flight']; //array of table headers to send to table component.

    const rowsPerPage = 5; // limit of rows to page.
    const nevigate = useNavigate();

    //create the socket for select on change .
    SendAndReceive_Socket(filterSelect, setTableData, setIsAdmin,
        enviorment_variables.Send_Filter_Select_Url, enviorment_variables.Recieve_Filter_Select_Url, loaded, setloaded, setDroneTypesData, setMessage)  //socket for send filter select to backend and recieve the table data . 




    useEffect(() => {
        setloaded(true);

        return () => {
            // cleanupSocket();
        };
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleButtonClick = (flightId) => { // handle show button event for each line in the table . 
        console.log(`Button clicked for Flight ID: ${flightId}`);
        nevigate(`/flightSimulation/${flightId}`)

        //create the socket for send data of selected flight




    };

    // Only render the component content when initial data (drone types and table starting data) is available
    if (droneTypesData.length === 0 && tableData.length === 0) {
        return <a href="/LoginPage" style={{ display: 'flex', fontSize: '40px', alignItems: 'center', justifyContent: 'center' }}>{message}</a>;
    }

    return (
        <>
            <Navbar isAdmin={isAdmin}></Navbar>
            <div className="filter-buttons">

                <FormControl style={{ marginRight: '10px', width: '140px' }}>
                    <InputLabel>Select 1</InputLabel>
                    <Select label='Select 1'>

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
                <Table_Component
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    flights={tableData}
                    rowsPerPage={rowsPerPage}
                    tableHeaders={tableHeaders}
                    handleButtonClick={handleButtonClick}
                />
            </div>

        </>
    );
};

export default HistoryComponent;


