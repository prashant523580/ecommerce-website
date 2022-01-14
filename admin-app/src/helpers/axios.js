import axios from "axios";
import { authConstants } from "../actions/constant";
import { api } from "../urlConfig";
import store from "../store/index";
const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
        baseURL: api,
        headers:{
                "Content-Type": "application/json",
                "Authorization" : token ? token : ""
        },
});

axiosInstance.interceptors.request.use((req) => {
    const {auth} = store.getState();
    if(auth){
            req.headers.Authorization = token;
    }
        return req;
})

axiosInstance.interceptors.response.use((res) => {
        return res;
},(err) => {
        console.log(err.response);
        if(err.response.status >= 400){
                StorageEvent.dispatch({
                        type: authConstants.LOGOUT_SUCCESS
                })
        }

        return Promise.reject(err);
})
export default axiosInstance;
