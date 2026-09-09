import React from "react";

import {
    Routes,
    Route
} from "react-router-dom";


import Login from "./page/Login";
import Register from "./page/Register";

import EmployeeProfile
    from "./page/EmployeeProfile";

import EmployeeDashboard
    from "./page/EmployeeDashboard";

import ApplyLeave
    from "./page/ApplyLeave";

import AdminDashboard
    from "./page/AdminDashboard";


function App() {

    return (

        <Routes>

            {/* LOGIN */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/login"
                element={<Login />}
            />


            {/* REGISTER */}

            <Route
                path="/register"
                element={<Register />}
            />


            {/* EMPLOYEE PROFILE */}

            <Route
                path="/employee-profile"
                element={<EmployeeProfile />}
            />


            {/* EMPLOYEE DASHBOARD */}

            <Route
                path="/employee-dashboard"
                element={<EmployeeDashboard />}
            />


            {/* APPLY LEAVE */}

            <Route
                path="/apply-leave"
                element={<ApplyLeave />}
            />


            {/* ADMIN */}

            <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
            />

        </Routes>

    );

}

export default App;