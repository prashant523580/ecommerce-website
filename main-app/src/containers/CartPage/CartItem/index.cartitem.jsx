import React, { useState } from "react";
import { generateImgUrl } from "../../../urlConfig";
import "./style.css";

const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);
    const { _id, name, price, img } = props.cartItem;
    return (
        <div className="cart">
            <div className="cart-body">
                <div className="cart-img">
                    <img src={generateImgUrl(img)} />
                </div>
                <div className="cart-details">
                    <div>
                        <p>{name}</p>
                        <p>Rs.{price}</p>
                    </div>
                    <div>delivery in </div>
                </div>
            </div>
            <div className="cart-footer">
                <div className="quantity-control">

                    <button>-</button>
                    <input className="quantity" value={qty} readOnly />
                    <button>+</button>
                </div>
                <button> save for later</button>
                <button onClick={() => props.onRemoveCartItem(_id)}>
                    remove</button>

            </div>
        </div>
    )
}

export default CartItem;