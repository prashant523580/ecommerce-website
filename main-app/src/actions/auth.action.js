// import axios from "axios"
import axios from "../helpers/axios"
import { api } from "../urlConfig"
import { authConstants } from "./constant"

export const login = (user) => {

    return async (dispatch)=> {
        try{

            dispatch({type:authConstants.LOGIN_REQUEST});
            
            const res= await axios.post("/signin",{...user});
            
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
                if(res.status === 422){
                    dispatch({
                        type:authConstants.LOGIN_FAILURE,
                        payload:{error: res.data.error}
                    })
                }
            }
        }catch(err){
            console.log(err.response)
            if(err.response.status === 422){
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload:{error: err.response.data.error}
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
        const res = await axios.post("/signup",{
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
                payload:{error: ""}
            })
        }
    }
}



export const signout = ()=> {
    return async dispatch => {
        dispatch({type: authConstants.LOGOUT_REQUEST})
       
     

            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        }
    
}