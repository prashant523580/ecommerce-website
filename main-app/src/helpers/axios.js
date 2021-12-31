import axios from "axios";
import { api } from "../urlConfig";
// import store from "../store/index";
const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
        baseURL: api,
        headers:{
                "Content-Type": "application/json",
                "Authorization" : token ? token : ""
        },
});


// axiosInstance.interceptors.request.use((req) => {
//     const {auth} = store.getState();
// })
export default axiosInstance;
