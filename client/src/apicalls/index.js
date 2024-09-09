import axios from "axios";

export const getToken = () => localStorage.getItem("token");

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const axiosInstance = axios.create({
    headers:{
        'Content-Type':'application/json',
        'Authorization':`${getAuthorizationHeader()}`,
        
    },
})