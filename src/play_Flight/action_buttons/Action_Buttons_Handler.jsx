import React from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoPlayForward, IoPlayBack } from "react-icons/io5";
import './Action_Buttons.css';



const ActionButtonsHanlder = ({ handlePlay_Pause, changeIconByPress, handleBackForward, handleForward }) => {


    return (
        <>
            <div className="buttons_container">
                <IoPlayBack className="customButton" onClick={handleBackForward}></IoPlayBack>
                {changeIconByPress ? ( // check if button pressed , and change icon by it . 
                    <FaPlay className="customButton" onClick={handlePlay_Pause}></FaPlay>
                ) : (
                    <FaPause className="customButton" onClick={handlePlay_Pause}></FaPause>
                )}


                <IoPlayForward className="customButton" onClick={handleForward}></IoPlayForward>
            </div>
        </>
    );
};



export default ActionButtonsHanlder; 