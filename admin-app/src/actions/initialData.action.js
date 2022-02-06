import axios from "../helpers/axios";
import { CategoryConstants,
     initialDataConstants,
      productsConstants,
      orderConstant
    } from "./constant"

export const getInitialData = () => {
    return async dispatch => { 
        const res = await axios.get("/initialdata");
        // console.log(res)
        if(res.status === 200){
            const {categories,products,orders } = res.data;
            dispatch({
                type : CategoryConstants.GET_CATEGORY_SUCCESS,
                payload:{
                    categories
                }
            });
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })
            dispatch({
                type: orderConstant.GET_ORDER_SUCCESS,
                payload:{
                    orders
                }
            })
        }
    }
}