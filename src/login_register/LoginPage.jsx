import { React, useState, useEffect } from "react";
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa'
import enviorment_variables from "../enviorment_variables";
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import { checkCookieExist } from "./checkCookie";
import { checkIdNumber, checkPassword, handleIdNumber, handlePassword } from "./Logic";

const LoginPage = () => {
    const Server_url = enviorment_variables.Server_URL + '/login';
    const [IdNumber, setIdNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();



    const handleSubmit = async (e) => { //function to handle submit form . 
        e.preventDefault();

        if (!IdNumber.trim() || !Password.trim()) {
            setError('Id and password are required.');
            return;
        }
        if (checkIdNumber(IdNumber) && checkPassword(Password)) {
            try {
                const hashPass = CryptoJS.SHA256(Password).toString();
                const response = await fetch(Server_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ IdNumber, password: hashPass }),
                    credentials: 'include'
                });

                const data = await response.json();
                if (data['error'] === 'Login valid ') {
                    setError('Login valid ');
                }
                if (response.ok) {
                    const session_token = checkCookieExist();
                    // Store session token in local storage or cookie
                    localStorage.setItem('session_token', session_token);

                    navigate('/flightsHistory');
                }

            } catch (error) {

                console.error('Error:', error);

                // Handle error
            }

        }
    }



    return (
        <div>

            <div className="pageContainer">
                <div className="container">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                id="IdNumber"
                                value={IdNumber}
                                placeholder="ID"
                                onChange={(event) => handleIdNumber(event, setIdNumber, setError)}
                                required />
                            <FaUser className="icon"></FaUser>
                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box">
                            <input
                                type='password'
                                id="password"
                                value={Password}
                                onChange={(event) => handlePassword(event, setPassword, setError)}
                                placeholder="Password"
                                required />
                            <FaLock className="icon"></FaLock>
                            <label className="errorLabel"></label>
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>



        </div>

    );
};

export default LoginPage;