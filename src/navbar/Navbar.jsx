import React from "react";
import './Navbar.css'


const Navbar = ({isAdmin}) => {

    return (

        <div className="topnav">
            <div >Home</div>
            <div >About</div>
            <div>Contact</div>
            {isAdmin &&
                <div className="split">AddUser</div>}
        </div>
    );


};


export default Navbar;