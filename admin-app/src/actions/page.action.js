import { accordionActionsClasses } from "@mui/material";
import axios from "../helpers/axios"
import { PageConstants } from "./constant";

export const CreatePage = (form) => {
    // console.log(form)
    return async dispatch => {
        try{
            dispatch({
                type: PageConstants.CREATE_PAGE_REQUEST
            });

            const res = await axios.post("/page/create",form);
            console.log(res)
            if(res.status === 201){
                dispatch({
                    type: PageConstants.CREATE_PAGE_SUCCESS,
                    payload: {
                        page : res.data.page
                    }
                })
            }else{
                dispatch({
                    type: PageConstants.CREATE_PAGE_FAILURE,
                    payload:{
                        error: res.data.error
                    }
                })
            }
            
        }catch(err){
            // console.log(err)
        }
    }
}