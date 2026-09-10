import base_url from "./base_url";
import commonApi from "./commonApi";


// ======================================
// LOGIN
// ======================================

export const loginApi = async (data) => {

    return await commonApi(
        `${base_url}/token/`,
        "POST",
        data,
        {
            "Content-Type": "application/json"
        }
    );

};


// ======================================
// REGISTER
// ======================================

export const registerApi = async (data) => {

    return await commonApi(
        `${base_url}/signup/`,
        "POST",
        data,
        {
            "Content-Type": "application/json"
        }
    );

};


// ======================================
// CREATE EMPLOYEE PROFILE
// ======================================

export const createEmployeeApi = async (data, token) => {

    return await commonApi(
        `${base_url}/employe/`,
        "POST",
        data,
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    );

};


// ======================================
// GET EMPLOYEE PROFILE
// ======================================

export const getEmployeeProfileApi = async (token) => {

    return await commonApi(
        `${base_url}/employe/`,
        "GET",
        {},
        {
            "Authorization": `Bearer ${token}`
        }
    );

};


// ======================================
// APPLY LEAVE
// ======================================

export const applyLeaveApi = async (data, token) => {

    return await commonApi(
        `${base_url}/employeleave/`,
        "POST",
        data,
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    );

};


// ======================================
// GET LEAVES
// ======================================

export const getLeavesApi = async (token) => {

    return await commonApi(
        `${base_url}/employeleave/`,
        "GET",
        {},
        {
            "Authorization": `Bearer ${token}`
        }
    );

};


// ======================================
// CANCEL LEAVE
// ======================================

export const cancelLeaveApi = async (id, token) => {

    return await commonApi(
        `${base_url}/employeleave/${id}/cancel/`,
        "POST",
        {},
        {
            "Authorization": `Bearer ${token}`
        }
    );

};


// ======================================
// APPROVE LEAVE
// ======================================

export const approveLeaveApi = async (id, token) => {

    return await commonApi(
        `${base_url}/employeleave/${id}/approve/`,
        "POST",
        {},
        {
            "Authorization": `Bearer ${token}`
        }
    );

};


// ======================================
// REJECT LEAVE
// ======================================

export const rejectLeaveApi = async (id, token) => {

    return await commonApi(
        `${base_url}/employeleave/${id}/reject/`,
        "POST",
        {},
        {
            "Authorization": `Bearer ${token}`
        }
    );

};