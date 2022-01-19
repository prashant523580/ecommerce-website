
import axios from "../helpers/axios"
import store from "../store/index"
import { CartConstants } from "./constant";

const getCartItems = () => {
        return async dispatch =>{
            try{
                dispatch({type: CartConstants.ADD_TO_CART_REQUEST});
                const res = await axios.get(`/user/getcartitems`);

                if(res.status === 200){
                    const {cartItems} = res.data;
                    if(cartItems){
                        dispatch({
                            type:CartConstants.ADD_TO_CART_SUCCESS,
                            payload:{
                                cartItems
                            }
                        })
                    }
                }
            }catch(error){

                console.log(error);
            }
        }
}
export const addToCart = (product,newQnty =1) => {
    return async (dispatch) => {
        const {
            cart : {
                cartItems
            },
            auth
        } = store.getState();
       const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQnty) : 1;
        cartItems[product._id] = {
            ...product,qty,
        }
       if(auth.authenticate){
            dispatch({
                type: CartConstants.ADD_TO_CART_REQUEST
            })
            const payload = {
                cartItems :[
                    {
                        product: product._id,
                        quantity: qty,
                    }
                ]
            }
            const res = await axios.post(`/user/cart/addtocart`, payload);
            if(res.status === 201){
                dispatch(getCartItems());
            }
        }else{
            localStorage.setItem("cart",JSON.stringify(cartItems))
        }

    }
}

export {getCartItems}