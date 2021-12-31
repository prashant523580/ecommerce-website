import axios from "../helpers/axios"
import { productsConstants } from "./constant";

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
export const getProductBySlug = (slug) => {

    return async (dispatch) => {
        const res = await axios.get(`/product/${slug}`);
        console.log(res)
        if(res.status ===200){
            dispatch({
                type: productsConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload:{
                    products: res.data.currentProducts,
                    productsByPrice : res.data.productByPrice

                }
            })
        }
    }
}