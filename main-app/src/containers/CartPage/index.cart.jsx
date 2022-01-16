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
    console.log({cartItems,auth});
    useEffect(()=>{
setCartItems(cart.cartItems);
    },[cart]);

    useEffect(() => {
        if(auth.authenticate){
            dispatch(getCartItems())
        }
    },[auth]);

console.log(cartItems)
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