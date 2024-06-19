import axios from "axios";


const Api = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
        "Content-Type": "application/json",
    },
});



export default Api;
