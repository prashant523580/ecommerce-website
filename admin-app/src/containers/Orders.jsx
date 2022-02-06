import React, { useEffect, useRef, useState } from 'react';
import Sidenav from '../components/SideNav';
import { useDispatch, useSelector } from "react-redux";
import "./order.css";
import { getUserOrder, updateUserOrder } from '../actions/order.action';
import { generateImgUrl } from '../urlConfig';

const Orders = () => {
    const order = useSelector(state => state.order)
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);
    const[type,setType] = useState();
    const [userOrderEmailDetails, setUserOrderEmailDetails] = useState();
    const slide = useRef();
    useEffect(() => {
        const payload = {
            orderId: "23jsd2222224redacded2ca5ad2d35d"
        }
        // dispatch(updateUserOrder(payload));
        // dispatch(getUserOrder());
    }, []);
    useEffect(() => {
        if (order.order) {
            setOrders(order.order)
        }

    })
    useEffect(() => {

        if (orders.length > 0) {

            let userOrderCategory = orders.reduce((value, user) => {
                if (!value.includes(user.user.email)) {
                    value.push(user.user.email)
                }
                return value
            }, []);
            if (userOrderCategory.length > 0) {
                setUser(userOrderCategory)

            }

        }
    }, [orders]);
    // console.log(userOrderEmail)


    const submitUserMail = (e) => {
        const mail = e.target.dataset.mail;
        // setUserOrderEmail(mail)
        let orderCategories = orders.filter((order, ind) => {
            // console.log(order.user)
            if (mail === order.user.email) {
                return order
            }
        })
        setUserOrderEmailDetails(orderCategories);    
        slide.current.style.transform = `translateX(-${1*100}%   )`
    }
    console.log(slide.current)
    const formatDate = (date) => {
        if(date){

            let d = new Date(date);
            let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
            return `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}
                      ${days[d.getDay()]}`;
        }
        return ''
    }
    const returnPage = () => {
        
        slide.current.style.transform = `translateX(-${0*100}%   )`
    }
    const orderUpdate = (id) => {
        const payload = {
            type,
            orderId: id
        }
        console.log(payload)
        dispatch(updateUserOrder(payload));
    }
    const renderOrderDetails = () => {
        if (!userOrderEmailDetails) {
            return null
        }
        return (
            <div className="orderDetails-container column-order">
                <button onClick={returnPage} style={{position:"absolute",
                left:"0",top:"0", zIndex:"9999999"}}>back</button>
                <div className="orderDetail-body">
                    {
                        userOrderEmailDetails.map((ord, ind) => {

                            return (
                                <div className="order-card" key={ind}>
                                    <div className="card-header">
                                        <div> 
                                        <p>payment Status: {ord.paymentStatus}</p>
                                        <p> payment Type: {ord.paymentType} </p>
                                        </div>
                                        <div>
                                            <select onChange={(e) => setType(e.target.value)}>
                                                <option value={''}> select status</option>
                                                {
                                                    ord.orderStatus.map((status,ind) => {
                                                        return(
                                                            <>{
                                                                !status.isCompleted ? 
                                                                <option key={ind} value={status.type}> {status.type}</option> : null
                                                            }
                                                            </>
                                                        )
                                                    })
                                                }    
                                            </select> &nbsp;
                                            <button onClick={() => orderUpdate(ord._id)}>confirm</button> 
                                         </div>
                                    </div>
                                    <div className="order-card-body">


                                        <div className='addressId'> {ord.addressId} </div>
                                        <div>
                                            {ord.items.map((item, ind) => {
                                                console.log(item)
                                                return (<div key={ind} className='item-details'>
                                                    <div className="order-detail">

                                                    <p> Product Name  : {item.productId.name.split(" ",3)} </p>
                                                    <p> Price : {item.payablePrice} </p>
                                                    <p> Total Amount  : {item.payablePrice * item.purchasedQuantity} </p>
                                                    <p> Total Quantity : {item.purchasedQuantity} </p>
                                                    </div>
                                                    <div className="order-detail">
                                                        <div className="img-content">
                                                            <img src={generateImgUrl(item.productId.productPicture[0].img)} alt="" />
                                                        </div>
                                                    </div>
                                                </div>)
                                            })}
                                        </div>
                                        <div className="item-track" style={{ display: 'flex' }}>

                                            {
                                                ord.orderStatus.map((status, ind) => {
                                                    return (
                                                        <div key={ind} className="status-container">
                                                            <div className={`line ${status.isCompleted ? "active" : ""}`}></div>
                                                            <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                                                            <div className="order-info">
                                                                <div className="status">{status.type}</div>
                                                                <div className="date">{formatDate(status.date)}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="page-container">

                <Sidenav />
                <div className="container-order">
                    <div ref={slide} className="row-order">

                        <div className="column-order users">
                            {/* <div className="user-header">users</div> */}
                            <div className="user-body">

                                {
                                    user && user.map((mail, ind) => {
                                        return (

                                            <div key={ind} className="user">
                                                <p data-mail={mail} onClick={submitUserMail}>{mail}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {renderOrderDetails()}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Orders;