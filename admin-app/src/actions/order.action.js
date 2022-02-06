import axios from "../helpers/axios";
import { orderConstant } from "./constant";

export const updateUserOrder = (payload)  =>{
    return async dispatch => {
        
        try{
            dispatch({
                type:orderConstant.UPDATE_ORDER_REQUEST
            })
            let res = axios.post("/order/updateOrder",payload);
            if(res.status === 201){
                dispatch({type:orderConstant.UPDATE_ORDER_SUCCESS});
                dispatch(getUserOrder());
            }
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }
}

export const getUserOrder = () => {
    return async dispatch => {
        try{
 dispatch({type: orderConstant.GET_ORDER_REQUEST});
 let res = await axios.get("/order/getCustomerOrders");

//  console.log(res.data);
            if(res.status === 200){
                const {orders} = res.data;
                dispatch({
                    type:orderConstant.GET_ORDER_SUCCESS,
                    payload :{orders}
                })
            }
}catch(error){
            console.log({error});
        }
    }
}