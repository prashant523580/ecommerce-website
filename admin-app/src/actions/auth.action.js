// import axios from "axios"
import axios from "../helpers/axios"
import { api } from "../urlConfig"
import { authConstants } from "./constant"

export const login = (user) => {

    return async (dispatch)=> {
        dispatch({type:authConstants.LOGIN_REQUEST});
        // const res = await fetch(`${api}/admin/signin`,{
        //     method:"post",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({...user}),
        //     // credentials :"include"
        // });
        const res= await axios.post("/admin/signin",{...user});
        console.log(res)
        if(res.status === 200){
            const {user,token} = await res.data;
            console.log(user)
            localStorage.setItem('token',token);
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{

                    token,
                    user
                }
            })
        }else{
            if(res.status === 400){
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload:{error: res.data.error}
                })
            }
        }
    }
}
export const signup = (user) => {
console.log(user)
    return async (dispatch)=> {
        dispatch({type:authConstants.LOGIN_REQUEST});

        // const res = await fetch(api+"/admin/signup",{
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({...user})
        // });
        const res = await axios.post("/admin/signup",{
            ...user
        })
        console.log(res)
        // if(res.status === 201){
        //     const {message} = res.data;
        //     // localStorage.setItem('token',token);
        //     localStorage.setItem("user", JSON.stringify(user))
        //     dispatch({
        //         type: authConstants.LOGIN_SUCCESS,
        //         payload:{
        //             message,
        //             user
        //         }
        //     });
        // }else{
        //     if(res.status === 400){
        //         dispatch({
        //             type:authConstants.LOGIN_FAILURE,
        //             payload:{error: res.data.error}
        //         })
        //     }
        // }
    }
}
export const isUserLoggedIn =()=> {
    return async dispatch => {
        const token = localStorage.getItem("token");
        if(token){
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload :{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{error: "failed to login"}
            })
        }
    }
}



export const signout = ()=> {
    return async dispatch => {
        dispatch({type: authConstants.LOGOUT_REQUEST})
        const res = await fetch(api+"/admin/signout",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(res)
        if(res.status === 200){

            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {error : res.data.error}
            })
        }
    }
}