import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    getLeavesApi,
    approveLeaveApi,
    rejectLeaveApi
} from "../services/allApi";


function AdminDashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("access");


    const [leaves, setLeaves] = useState([]);

    const [error, setError] = useState("");


    // ==================================
    // GET ALL LEAVES
    // ==================================

    const getAllLeaves = async () => {

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
                "Unable to load leave applications"
            );

        }

    };


    useEffect(() => {

        getAllLeaves();

    }, []);


    // ==================================
    // APPROVE
    // ==================================

    const approveLeave = async (id) => {

        try {

            await approveLeaveApi(
                id,
                token
            );


            alert(
                "Leave approved successfully"
            );


            getAllLeaves();


        } catch (error) {

            console.log(error);

            alert(
                "Unable to approve leave"
            );

        }

    };


    // ==================================
    // REJECT
    // ==================================

    const rejectLeave = async (id) => {

        try {

            await rejectLeaveApi(
                id,
                token
            );


            alert(
                "Leave rejected successfully"
            );


            getAllLeaves();


        } catch (error) {

            console.log(error);

            alert(
                "Unable to reject leave"
            );

        }

    };


    // ==================================
    // LOGOUT
    // ==================================

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
                        Admin Dashboard
                    </h1>

                    <p>
                        Leave Management System
                    </p>

                </div>


                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>


            {error && (

                <div className="error-box">
                    {error}
                </div>

            )}


            {/* ALL LEAVES */}

            <div className="table-card">

                <h2>
                    All Employee Leave Applications
                </h2>


                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Employee</th>

                                <th>Reason</th>

                                <th>Days</th>

                                <th>Start</th>

                                <th>End</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {leaves.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
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
                                            {leave.name}
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
                                                "REQUESTED" && (

                                                <div className="action-buttons">

                                                    <button
                                                        className="approve-btn"
                                                        onClick={() =>
                                                            approveLeave(
                                                                leave.id
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </button>


                                                    <button
                                                        className="reject-btn"
                                                        onClick={() =>
                                                            rejectLeave(
                                                                leave.id
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                </div>

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

export default AdminDashboard;