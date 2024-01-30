import { React, useState } from "react";
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa'
import enviorment_variables from "../enviorment_variables";
import CryptoJS from 'crypto-js';

const LoginPage = () => {
    const Server_url = enviorment_variables.Server_URL + '/login';
    const [IdNumber, setIdNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');





    function checkIdNumber(id) { // regex for checking idNumber
        return /^\d{9}$/.test(id);
    }
    function checkPassword(password) { // regex for checking password .
        return /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(password);
    }


    const handleIdNumber = (e) => { // function to handle on change id Number for showing error if neccesary.
        const value = e.target.value;

        // Validate if the Id contains only numbers and has a  length of 9
        if (!checkIdNumber(value)) {
            setError('Id must be exactly 9 digits long and contain only numbers.');
        } else {
            setError('');
        }
        setIdNumber(value);

    }

    const handlePassword = (e) => { // function to handle on change password for showing error if neccesary.
        const value = e.target.value;

        // Validate if the password meets the criteria using a single regex pattern
        if (!checkPassword(value)) {
            setError('Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one letter.');
        } else {
            setError('');
        }

        setPassword(value);
    }



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
                const cookie = response.headers.get('Set-Cookie');
                console.log(cookie);
                if (cookie) {
                    console.log('dsds');
                    // localStorage.setItem('user_cookie', cookie);
                    console.log(cookie);
                }

                // Handle response data here
                console.log(data);
            } catch (error) {

                console.error('Error:', error);

                // Handle error
            }

        }
    }



    return (

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
                            onChange={handleIdNumber}
                            required />
                        <FaUser className="icon"></FaUser>
                        <label className="errorLabel"></label>
                    </div>
                    <div className="input-box">
                        <input
                            type='password'
                            id="password"
                            value={Password}
                            onChange={handlePassword}
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

    );
};

export default LoginPage;