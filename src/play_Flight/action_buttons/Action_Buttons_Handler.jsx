import React from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoPlayForward, IoPlayBack } from "react-icons/io5";
import './Action_Buttons.css';



const Action_Buttons_Hanlder = ({handlePlay_Pause}) => {


    return (
        <>
            <div className="buttons_container">
                <IoPlayBack className="customButton"></IoPlayBack>
                <FaPlay className="customButton" onClick={handlePlay_Pause}></FaPlay>
                <IoPlayForward className="customButton"></IoPlayForward>
            </div>
        </>
    );
};



export default Action_Buttons_Hanlder; 