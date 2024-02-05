import { React, useState } from "react";
import './LoginPage.css';
import {  FaLock } from 'react-icons/fa'
import enviorment_variables from "../enviorment_variables";
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import { checkIdNumber, checkPassword, handleIdNumber, handlePassword, handleName, handleAge, checkAge, handleRole, checkRole } from "./Logic";

const RegisterPage = () => {
    const Server_url = enviorment_variables.Server_URL + '/addUser';
    const [IdNumber, setIdNumber] = useState('');
    const [IdfNumber, setIdfNumber] = useState('');
    const [Role, setRole] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();





    const handleSubmit = async (e) => { //function to handle submit form . 
        e.preventDefault();

        if (!IdNumber.trim() || !Password.trim() || !Name.trim() || !age.trim()
            || !IdfNumber.trim() || !Role.trim()) {
            setError('all inputs are required');
            return;
        }
        if (checkIdNumber(IdNumber) && checkPassword(Password) && checkAge(age) && checkRole(Role)) {
            try {
                const hashPass = CryptoJS.SHA256(Password).toString();
                const response = await fetch(Server_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Name, age, IdNumber, IdfNumber, Role, password: hashPass }),
                    credentials:'include'    
                });
    
                const data = await response.json();
                console.log(data);
                // if (data['error'] === 'Login valid ') {
                //     setError('Login valid ');
                // }
                // if (response.ok) {
                //     const session_token = checkCookieExist();
                //     // Store session token in local storage or cookie
                //     localStorage.setItem('session_token', session_token);

                //     navigate('/flightsHistory');
                // }

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
                        <h1>Add User</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                id="name"
                                value={Name}
                                placeholder="Name"
                                onChange={(event) => handleName(event, setName, setError)}
                                required />

                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box">
                            <input
                                type='number'
                                id="age"
                                value={age}
                                placeholder="age"
                                onChange={(event) => handleAge(event, setAge, setError)}
                                required />
                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                id="IdNumber"
                                value={IdNumber}
                                placeholder="ID"
                                onChange={(event) => handleIdNumber(event, setIdNumber, setError)}
                                required />

                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                id="IdfNumber"
                                value={IdfNumber}
                                placeholder="IDF"
                                onChange={(event) => handleIdNumber(event, setIdfNumber, setError)}
                                required />
                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                id="Role"
                                value={Role}
                                placeholder="Role - Admin / User"
                                onChange={(event) => handleRole(event, setRole, setError)}
                                required />
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
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>



        </div>

    );
};

export default RegisterPage;