import axios from "../helpers/axios"
import { api } from "../urlConfig"
import { authConstants } from "./constant"

export const login = (user) => {

    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });
    try{

       const  res = await axios.post("/admin/signin", { ...user });
        if (res.status === 200) {
            const { user, token } = await res.data;

            localStorage.setItem('token', token);
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            })
        } 
        

}catch(error){
        const {data} = error.response;
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: data.error }
        })
        
    
    
}


    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
         }
         else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: '' }
            })
        }
    }
}



export const signout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = await fetch(api + "/admin/signout", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(res)
        if (res.status === 200) {

            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}