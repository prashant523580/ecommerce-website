import React, { useState } from "react";
import { generateImgUrl } from "../../../urlConfig";
import "./style.css";

const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);
    const { _id, name, price, img } = props.cartItem;
    const onQuantityIncrement = () => {
        console.log(qty);
        setQty(qty + 1);
        props.onQuantityIncre(_id,qty - 1)
    }
    const onQuantityDecrement = () => {
        if(qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDecre(_id,qty - 1)
    }

    return (
        <div className="cart">
            <div className="cart-body">
                <div className="cart-img">
                    <img src={generateImgUrl(img)} />
                </div>
                <div className="cart-details">
                    <div>
                        <h4>{name}</h4>
                        <p>Rs.{price}</p>
                    </div>
                    <div>delivery in </div>
                </div>
            </div>
            <div className="cart-footer">
                <div className="quantity-control">

                    <button onClick={onQuantityDecrement}>-</button> 
                    <input className="quantity" value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>&nbsp;
                <button className="remove-btn" onClick={() => props.onRemoveCartItem(_id)}>
                    remove</button>
                </div>
                </div>
                <div className="buttons">

                {/* <button> save for later</button> */}

            </div>
        </div>
    )
}

export default CartItem;