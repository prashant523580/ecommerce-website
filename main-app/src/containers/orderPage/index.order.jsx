import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Card from "../../components/ui/card/index.card";
import { generateImgUrl } from "../../urlConfig";
import "./style.css"
const OrderPage = (props) =>{
    const auth = useSelector(state => state.auth);
    const [orders,setOrders] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
        
    },[])
    // useEffect(() => {
    //     setOrders(auth.orders);
   
    // },[auth.orders]);
    // console.log(orders)
    return(
        <>
            <div className="page-container">
                <div className="row orders">
                    
                    { auth.orders.map((ord,ind) => 
                        <Card
                         key={ind}
                        header={
                            {

                                leftHeader:"Order",
                                rightHeader:"l"
                            }
                        }
                        >
                            <Link to={`/order_details/${ord._id}`}>
                                <div className="img-container">
                                    <img src={generateImgUrl(ord.items[0].productId.productPicture[0].img)} alt="" />    
                                </div> 
                                <div className="order-details">
                                    {console.log(ord)}
                                    <div className="product-name">{ord.items[0].productId.name}</div>
                                </div>
                            </Link>
                        </Card>
                    )}
                </div>
                <div className="row">

                </div>

            </div>
        </>
    )
}

export default OrderPage;