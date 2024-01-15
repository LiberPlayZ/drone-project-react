import React from "react";
import './HistoryComponent.css';
import Button from '@mui/material/Button';

const Table_Component = ({
    currentPage, //prop for cuurent page number . 
    handlePageChange, // callbacl for handle page change .
    flights, // the flight data . 
    rowsPerPage, // variable for number of rows for page .
    tableHeaders, // array of the headers of the table .
    handleButtonClick // call back function to handle each table row button . 
}) => {
    //variables to handle next / previos page .
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentFlights = flights.slice(startIndex, endIndex);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentFlights.map((flight) => (
                        <tr key={flight.flightId}>
                            {/* Adjust this part based on your data structure */}
                            <td>{flight.flightId}</td>
                            <td>{flight.droneType}</td>
                            <td>{flight.isDangerous ? 'Yes' : 'No'}</td>
                            <td>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleButtonClick(flight.flightId)}>
                                    Show
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pageNavigation">
                <Button
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ margin: '0 5px', width: '100px' }}
                >
                    Previous
                </Button>
                <span>{`Page ${currentPage}`}</span>
                <Button
                    variant="contained"
                    disabled={currentFlights.length < rowsPerPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ margin: '0 5px', width: '100px' }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};


export default Table_Component;