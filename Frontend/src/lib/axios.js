import axios from "axios"

export const axiosInstance = axios.create({
    // dynamic url
    baseURL: import.meta.env.MODE === "development"? "http://localhost:5001/api":"/api",
    withCredentials: true, // send cookies in every request
})