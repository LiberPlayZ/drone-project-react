import React from "react";
import './HistoryComponent.css';
import Button from '@mui/material/Button';

const Table_component = ({
    currentPage,
    handlePageChange,
    flights,
    rowsPerPage,
    tableHeaders,
    handleButtonClick
}) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentFlights = flights.slice(startIndex, endIndex);

    return (
        <div className="pagination">
            {/* ... Pagination controls */}

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


export default Table_component;





