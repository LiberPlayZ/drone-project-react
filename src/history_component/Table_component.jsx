import React from "react";
import './Table_Component.css';
import Button from '@mui/material/Button';

const Table_Component = ({
    currentPage, //prop for cuurent page number . 
    handlePageChange, // callbacl for handle page change .
    flights, // the flight data . 
    rowsPerPage, // variable for number of rows for page .
    tableHeaders, // array of the headers of the table .
    tableDataHeades, // array for table data Headers.
    handleButtonClick, // call back function to handle each table row button . 
    styleBoolean, //bool for styling fontsize by components . true for history and false for simulation.
    selected

}) => {
    //variables to handle next / previos page .
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentFlights = flights.slice(startIndex, endIndex);
    const activeStyles = {
        fontSize: styleBoolean ? '15px' : '10px',

    };
    const isDangerousSyle = {
        fontSize: !styleBoolean ? '15px' : '10px',

    };

    return (
        <div>
            <table style={activeStyles}>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentFlights.map((flight, index) => (
                        <tr key={((currentPage - 1) * rowsPerPage) + index + 1} className={selected === index ? 'selected_row' : ''}>
                            <td>{((currentPage - 1) * rowsPerPage) + index + 1}</td>
                            <td>{flight[tableDataHeades[0]]}</td>
                            <td>{flight[tableDataHeades[1]]}</td>
                            <td>{flight[tableDataHeades[2]]}</td>
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