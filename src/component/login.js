import React, { useState, useContext } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import './auth.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Userprovider"; // Import UserContext

function LogIn({ setActivecomponent, onLogin }) {
    const [LoginData, setloginData] = useState({
        email: '',
        password: '',
    });
    const { setUser } = useContext(UserContext); // Access setUser from UserContext
    const navigate = useNavigate();

    const handleloginChange = (e) => {
        setloginData({
            ...LoginData,
            [e.target.name]: e.target.value

        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/login', LoginData);
            console.log(response);

            alert('login successful!');
            localStorage.setItem('token', response.data.token);
            onLogin();
            navigate('/home');

        } catch (err) {
            console.log(err);
            alert('login failed.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLoginSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleloginChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleloginChange}
                    required
                />

                <button type="submit" className="auth-button">Sign in</button>
                <a href="#" className="switch-link" onClick={() => setActivecomponent('forget')}>Forgotten password?</a>
                <hr />
                <button type="button" className="create-account-button" onClick={() => setActivecomponent('signup')}>Create New account</button>
            </form>
        </div>
    );
}

export default LogIn;