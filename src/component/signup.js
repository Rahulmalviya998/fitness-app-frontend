import React, { useState } from "react";
import axios from "axios";
import './auth.css'

function SignUp({setActivecomponent}) {
    const [signupData, setsignupData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        weight: '',
        height: ''

    });

    const handleRegisterChange = (e) => {
        setsignupData({
            ...signupData,
            [e.target.name]: e.target.value

        });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/register', signupData);
            console.log(response);

            alert('Registration successful!');
        } catch (err) {
            console.error(err);
            alert('Registration failed.');
        }
    };

    return (
    <div className="main-div" style={{height:"100%",width:"100%"}}>
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="text"
                    name="weight"
                    placeholder="weight"
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="text"
                    name="age"
                    placeholder="age"
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleRegisterChange}
                    required
                />

                <button type="submit" className="auth-button">Sign Up</button>
                <hr />
                <button type="button" className="switch-link" onClick={()=>setActivecomponent('login')}>Already have an account? log in</button>

            </form>
        </div>
        </div>
    );
}

export default SignUp;