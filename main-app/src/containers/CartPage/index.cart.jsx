import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../actions";
import Card from "../../components/ui/card/index.card";
import CartItem from "./CartItem/index.cartitem";
const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [cartItems,setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();
    useEffect(()=>{
        setCartItems(cart.cartItems);
    },[cart.cartItems]);
    
    // console.log(cartItems)
    useEffect(() => {
        if(auth.authenticate){
            dispatch(getCartItems())
        }
    },[auth.authenticate]);


    return(
        <>
      
          

              
              {
                  Object.keys(cartItems).map((key,ind) => 
                    <CartItem
                  key={ind}
                    cartItem={cartItems[key]}
                  />
                  )
              }
          
        </>
    )
}


export default CartPage;