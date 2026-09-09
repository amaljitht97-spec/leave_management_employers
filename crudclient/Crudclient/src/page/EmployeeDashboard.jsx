import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    getLeavesApi,
    cancelLeaveApi
} from "../services/allApi";


function EmployeeDashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("access");

    const username =
        localStorage.getItem("username");


    const [leaves, setLeaves] = useState([]);

    const [error, setError] = useState("");


    // =================================
    // GET MY LEAVES
    // =================================

    const getLeaves = async () => {

        try {

            const response =
                await getLeavesApi(token);

            console.log(response);


            const data =
                response?.results || response;


            setLeaves(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (error) {

            console.log(error);

            setError(
                "Unable to load leaves"
            );

        }

    };


    useEffect(() => {

        getLeaves();

    }, []);


    // =================================
    // CANCEL
    // =================================

    const cancelLeave = async (id) => {

        const confirmCancel =
            window.confirm(
                "Do you want to cancel this leave?"
            );


        if (!confirmCancel) {

            return;

        }


        try {

            await cancelLeaveApi(
                id,
                token
            );


            alert(
                "Leave cancelled successfully"
            );


            getLeaves();


        } catch (error) {

            console.log(error);

            alert(
                error?.message ||
                "Only requested leave can be cancelled"
            );

        }

    };


    // =================================
    // LOGOUT
    // =================================

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };


    return (

        <div className="dashboard">

            {/* HEADER */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        Employee Dashboard
                    </h1>

                    <p>
                        Welcome, {username}
                    </p>

                </div>


                <div className="header-buttons">

                    <button
                        className="apply-btn"
                        onClick={() =>
                            navigate("/apply-leave")
                        }
                    >
                        + Apply Leave
                    </button>


                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="error-box">
                    {error}
                </div>

            )}


            {/* TABLE */}

            <div className="table-card">

                <h2>
                    My Leave Applications
                </h2>


                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Reason</th>

                                <th>Days</th>

                                <th>Start Date</th>

                                <th>End Date</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {leaves.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty"
                                    >
                                        No leave applications
                                    </td>

                                </tr>

                            ) : (

                                leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>
                                            {leave.id}
                                        </td>

                                        <td>
                                            {leave.reason}
                                        </td>

                                        <td>
                                            {leave.howmany_days}
                                        </td>

                                        <td>
                                            {leave.leave_taken}
                                        </td>

                                        <td>
                                            {leave.end_leave}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${leave.status?.toLowerCase()}`}
                                            >
                                                {leave.status}
                                            </span>

                                        </td>

                                        <td>

                                            {leave.status ===
                                                "REQUESTED" ? (

                                                <button
                                                    className="cancel-btn"
                                                    onClick={() =>
                                                        cancelLeave(
                                                            leave.id
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>

                                            ) : (

                                                <span>
                                                    —
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default EmployeeDashboard;