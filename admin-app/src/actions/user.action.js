import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constant"
export const userSignup = (user) => {
    console.log(user)
    return async (dispatch)=> {
        
    
                try{
                    
                    dispatch({type:userConstants.USER_REGISTER_REQUEST});
            const res = await axios.post("/admin/signup",{
                ...user
            });
            console.log(res)
            if(res.status === 201){
                const {message,token,user} = res.data;
                console.log(token)
                localStorage.setItem('token',token);
                localStorage.setItem("user", JSON.stringify(user))
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload:{
                        token,
                        message,user
                    }
                })
                dispatch({type: authConstants.LOGIN_SUCCESS,
                    payload:{
                        token,
                        user
                    }
                })
            }
        }catch(err){
            const {error} = err.response.data
            if(error){

                dispatch({
                    type:userConstants.USER_REGISTER_FAILURE,
                    payload:{error}
                })
                
            }
        }
        }
    }