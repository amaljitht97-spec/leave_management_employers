import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { applyLeaveApi } from "../services/allApi";


function ApplyLeave() {

    const navigate = useNavigate();

    const token = localStorage.getItem("access");


    const [reason, setReason] = useState("");

    const [howmany_days, setHowmanyDays] =
        useState("");

    const [leave_taken, setLeaveTaken] =
        useState("");

    const [end_leave, setEndLeave] =
        useState("");


    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    const applyLeave = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        try {

            const data = {

                reason: reason,

                howmany_days:
                    Number(howmany_days),

                leave_taken:
                    leave_taken,

                end_leave:
                    end_leave

            };


            await applyLeaveApi(
                data,
                token
            );


            setMessage(
                "Leave applied successfully!"
            );


            setTimeout(() => {

                navigate("/employee-dashboard");

            }, 1000);


        } catch (error) {

            console.log(error);

            if (
                typeof error === "object"
            ) {

                setError(
                    Object.values(error)
                        .flat()
                        .join(" ")
                );

            } else {

                setError(
                    "Leave application failed"
                );

            }

        }

    };


    return (

        <div className="page-container">

            <div className="leave-card">

                <h1>
                    Apply Leave
                </h1>

                <p className="subtitle">
                    Submit your leave request
                </p>


                <form onSubmit={applyLeave}>

                    {/* REASON */}

                    <label>
                        Leave Reason
                    </label>

                    <textarea
                        placeholder="Enter reason"
                        value={reason}
                        onChange={(e) =>
                            setReason(e.target.value)
                        }
                        required
                    />


                    {/* DAYS */}

                    <label>
                        Number of Days
                    </label>

                    <input
                        type="number"
                        min="1"
                        max="7"
                        placeholder="Example: 2"
                        value={howmany_days}
                        onChange={(e) =>
                            setHowmanyDays(
                                e.target.value
                            )
                        }
                        required
                    />


                    {/* START */}

                    <label>
                        Start Date
                    </label>

                    <input
                        type="date"
                        value={leave_taken}
                        onChange={(e) =>
                            setLeaveTaken(
                                e.target.value
                            )
                        }
                        required
                    />


                    {/* END */}

                    <label>
                        End Date
                    </label>

                    <input
                        type="date"
                        value={end_leave}
                        onChange={(e) =>
                            setEndLeave(
                                e.target.value
                            )
                        }
                        required
                    />


                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Submit Leave
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
                        navigate(
                            "/employee-dashboard"
                        )
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>

        </div>

    );

}

export default ApplyLeave;