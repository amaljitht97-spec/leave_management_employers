import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerApi } from "../services/allApi";


function Register() {

    const navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const register = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        try {

            const data = {
                username: username,
                password: password
            };


            await registerApi(data);


            setMessage(
                "Registration successful!"
            );


            setTimeout(() => {

                navigate("/login");

            }, 1000);


        } catch (error) {

            console.log(error);

            setError(
                error?.username?.[0] ||
                "Registration failed"
            );

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Leave Management</h1>

                <h3>Create Account</h3>


                <form onSubmit={register}>

                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button type="submit">
                        Register
                    </button>

                </form>


                {message && (

                    <p className="success">
                        {message}
                    </p>

                )}


                {error && (

                    <p className="error">
                        {error}
                    </p>

                )}


                <p className="auth-link">

                    Already have account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;