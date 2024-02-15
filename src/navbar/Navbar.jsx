import React from "react";
import './Navbar.css'
import { useNavigate } from 'react-router-dom'


const Navbar = ({isAdmin}) => { //component for navbar , get as prop bolean isAdmin to show button if true . 

  
    return (
        <div className="clearfix">
        <div className="topnav">
            <a href="/flightsHistory" >Flights History</a>
            <a >About</a>
            <a>Contact</a>
            {isAdmin &&
                <a className="split" href="/addUser">AddUser</a>}
        </div>
        <div style={{height:'80px'}}></div>
        </div>
    );


};


export default Navbar;