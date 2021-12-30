import axios from "../helpers/axios"
import { productsConstants } from "./constant";
export const addProduct = form => {
    return async dispatch => {
        dispatch({
            type: productsConstants.ADD_PRODUCT_REQUEST
        });
        const res = await axios.post('product/create',form);
        console.log(res)
        if(res.status === 201){
            dispatch({
                type: productsConstants.ADD_PRODUCT_SUCCESS,
                payload: {
                    products: res.data.product
                }
            })
        }else{
            dispatch({
                type:productsConstants.ADD_PRODUCT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

export const getAllProduct =() => {
    return async dispatch => {
        dispatch({
            type: productsConstants.GET_ALL_PRODUCTS_REQUEST
        })
        const res = await axios.get("/product/getproduct");
        if(res.status === 200){
            const{products} = res.data;
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {products}
            }) 
        }else{
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_FAILURE,
                error:res.data.error
            })
        }
        console.log(res)
    }
}