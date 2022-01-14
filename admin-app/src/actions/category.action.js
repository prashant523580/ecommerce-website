import axios from "../helpers/axios";
import { CategoryConstants } from "./constant";

export const getAllCategory = () => {
    return async (dispatch) => {
        const res = await axios.get(`/category/getcategory`);
        dispatch({
            type:CategoryConstants.GET_CATEGORY_REQUEST
        })
        if(res.status === 200){
            const categoryList = res.data;
            dispatch({
                type: CategoryConstants.GET_CATEGORY_SUCCESS,
                payload: {
                    categories : categoryList
                }
            })
        }else{
            dispatch({
                type: CategoryConstants.GET_CATEGORY_FAILURE,
                payload: {
                    error : res.data.error
                }
            })
        }
    }
}

export const addCategory = (form) => {
    return async (dispatch) => {
        try{

            dispatch({type: CategoryConstants.ADD_CATEGORY_REQUEST})
            const res = await axios.post(`/category/create`,form);
            if(res.status === 201){
                dispatch({
                    type : CategoryConstants.ADD_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.category
                    }
                })
            }else{
                dispatch({
                    type : CategoryConstants.ADD_CATEGORY_FAILURE,
                    payload:{
                        error : res.data.error
                    } 
                })
                
            }
            
        }catch(err){
            console.log(err.response)
        }
    }
}
export const updateCategories = (category) => {
        return async (dispatch) => {
            dispatch({
                type: CategoryConstants.UPDATE_CATEGORY_REQUEST
            })
            const res = await axios.post("/category/update",category);
            if(res.status === 201){
                dispatch({
                    type: CategoryConstants.UPDATE_CATEGORY_SUCCESS,
                })
                dispatch(getAllCategory());
            }else{
                const {error} = res.data;
                dispatch({
                    type: CategoryConstants.UPDATE_CATEGORY_FAILURE,
                    payload:{
                        error
                    }
                });
            }
        }
}
export const deleteCategoryAction = (categoriesId) => {
    // console.log(categoriesId)
    return async dispatch => {
        const res = await axios.post("/category/delete",{
            payload : {
                categoriesId
            }
        
        });
        if(res.status === 200){
           const {message} = res.data;
           dispatch({
               type:CategoryConstants.DELETE_CATEGORY_SUCCESS,
               payload: {
                   message
               }
           })
        }
    }
}