import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/allApi";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const login = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const data = {
                username: username,
                password: password
            };


            const response = await loginApi(data);

            console.log(response);


            // SAVE TOKEN

            localStorage.setItem(
                "access",
                response.access
            );

            localStorage.setItem(
                "refresh",
                response.refresh
            );

            localStorage.setItem(
                "username",
                username
            );


            // ADMIN LOGIN

            if (username.toLowerCase() === "admin") {

                localStorage.setItem("role", "admin");

                navigate("/admin-dashboard");

            }

            // EMPLOYEE LOGIN

            else {

                localStorage.setItem("role", "employee");

                navigate("/employee-profile");

            }


        } catch (error) {

            console.log(error);

            setError(
                error?.detail ||
                "Invalid username or password"
            );

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Leave Management</h1>

                <h3>Login</h3>


                <form onSubmit={login}>

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
                        Login
                    </button>

                </form>


                {error && (

                    <p className="error">
                        {error}
                    </p>

                )}


                <p className="auth-link">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;