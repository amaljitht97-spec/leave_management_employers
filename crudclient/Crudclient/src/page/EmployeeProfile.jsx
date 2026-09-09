import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    createEmployeeApi,
    getEmployeeProfileApi
} from "../services/allApi";


function EmployeeProfile() {

    const navigate = useNavigate();

    const token = localStorage.getItem("access");


    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =================================
    // CHECK PROFILE
    // =================================

    const checkProfile = async () => {

        try {

            const response =
                await getEmployeeProfileApi(token);

            console.log(response);

            const profiles =
                response?.results || response;


            if (
                Array.isArray(profiles) &&
                profiles.length > 0
            ) {

                setCompany(
                    profiles[0].company || ""
                );

                setPosition(
                    profiles[0].position || ""
                );

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        checkProfile();

    }, []);


    // =================================
    // CREATE PROFILE
    // =================================

    const createProfile = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        try {

            const data = {
                company: company,
                position: position
            };


            await createEmployeeApi(
                data,
                token
            );


            setMessage(
                "Profile created successfully!"
            );


            setTimeout(() => {

                navigate("/employee-dashboard");

            }, 1000);


        } catch (error) {

            console.log(error);

            setError(
                error?.detail ||
                "Profile creation failed. Maybe profile already exists."
            );

        }

    };


    if (loading) {

        return (
            <div className="loading">
                Loading...
            </div>
        );

    }


    return (

        <div className="page-container">

            <div className="profile-card">

                <h1>Employee Profile</h1>

                <p className="subtitle">
                    Create your employee profile
                </p>


                <form onSubmit={createProfile}>

                    <label>
                        Company
                    </label>

                    <input
                        type="text"
                        placeholder="Enter company"
                        value={company}
                        onChange={(e) =>
                            setCompany(e.target.value)
                        }
                        required
                    />


                    <label>
                        Position
                    </label>

                    <input
                        type="text"
                        placeholder="Enter position"
                        value={position}
                        onChange={(e) =>
                            setPosition(e.target.value)
                        }
                        required
                    />


                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Create Profile
                    </button>

                </form>


                {message && (

                    <div className="success-box">
                        {message}
                    </div>

                )}


                {error && (

                    <div className="error-box">
                        {error}
                    </div>

                )}


                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/employee-dashboard")
                    }
                >
                    Go to Dashboard
                </button>

            </div>

        </div>

    );

}

export default EmployeeProfile;