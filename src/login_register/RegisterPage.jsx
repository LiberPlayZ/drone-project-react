import { React, useState, useEffect } from "react";
import './LoginPage.css';
import { FaLock } from 'react-icons/fa'
import enviorment_variables from "../enviorment_variables";
import CryptoJS from 'crypto-js';
import Navbar from "../navbar/Navbar";
import { checkIdNumber, checkPassword, handleIdNumber, handlePassword, handleName, handleAge, checkAge, handleRole, checkRole } from "./Logic";

const RegisterPage = () => {
    const Server_url = enviorment_variables.Server_URL;
    const [IdNumber, setIdNumber] = useState('');
    const [IdfNumber, setIdfNumber] = useState('');
    const [Role, setRole] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [age, setAge] = useState('');
    const [checkConnectedRole, setCheckConnectedRole] = useState('')
    const [error, setError] = useState('');

 

    useEffect(() => {
        // Make a POST request to your backend to fetch the user's role
        fetch(Server_url + '/currentRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({})
        })
            .then(response => {
                if (!response.ok) {
                    setCheckConnectedRole('user')
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data)
                setCheckConnectedRole(data.Role)
            })
            .catch(error => {
                console.error('Error fetching user role:', error);
            });
    }, []);



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
                const response = await fetch(Server_url + '/addUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Name, age, IdNumber, IdfNumber, Role, password: hashPass }),
                    credentials: 'include'
                });

                const data = await response.json();
                console.log(data);
              

            } catch (error) {

                console.error('Error:', error);

                // Handle error
            }

        }
    }

    if (checkConnectedRole!=='admin') {
        return <a href="/LoginPage" style={{ display: 'flex', fontSize: '40px', alignItems: 'center', justifyContent: 'center' }}
        >Your role can not add user ,pls log in</a>;
    }

    return (
        <div>
        <Navbar></Navbar>
            <div className="pageContainer" >
           
                <div className="container" >
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Add User</h1>
                        <div className="input-box" style={{height:'30px'}}>
                            <input
                                type="text"
                                id="name"
                                value={Name}
                                placeholder="Name"
                                onChange={(event) => handleName(event, setName, setError)}
                                required />

                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box" style={{height:'30px'}}>
                            <input
                                type='number'
                                id="age"
                                value={age}
                                placeholder="age"
                                onChange={(event) => handleAge(event, setAge, setError)}
                                required />
                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box" style={{height:'30px'}}>
                            <input
                                type="text"
                                id="IdNumber"
                                value={IdNumber}
                                placeholder="ID"
                                onChange={(event) => handleIdNumber(event, setIdNumber, setError)}
                                required />

                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box" style={{height:'30px'}}>
                            <input
                                type="text"
                                id="IdfNumber"
                                value={IdfNumber}
                                placeholder="IDF"
                                onChange={(event) => handleIdNumber(event, setIdfNumber, setError)}
                                required />
                            <label className="errorLabel"></label>
                        </div>
                        <div className="input-box" style={{height:'30px'}}>
                            <input
                                type="text"
                                id="Role"
                                value={Role}
                                placeholder="Role - Admin / User"
                                onChange={(event) => handleRole(event, setRole, setError)}
                                required />
                            <label className="errorLabel"></label>
                        </div>

                        <div className="input-box" style={{height:'30px'}}>
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