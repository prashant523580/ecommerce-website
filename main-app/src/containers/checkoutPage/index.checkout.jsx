import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../actions";
import { login, getAddress } from "../../actions/auth.action";
import Card from "../../components/ui/card/index.card";
import CartPage from "../CartPage/index.cart";
import AddressForm from "./AddressForm";
import "./style.css";
const CheckoutStep = (props) => {
    return (
        <>
            <div className="checkout">
                <div onClick={props.onClick} className={`checkout-header ${props.active && "active"}`}>
                    <div className="step-number">{props.step}</div>
                    <div className="title">{props.title}</div>
                </div>
                <div className="checkout-body">
                    {props.body}
                </div>
                <div className="checkout-footer">
                    {props.footer && props.footer}
                </div>
            </div>
        </>
    )
}
const Address = ({ index, adr, selectAddress, onAddressSubmit, enableAddressEditForm, confirmDeliveryAddress }) => {
    return (
        <>
            {
                !adr.edit ? (



                    <div className="address">
                        <input name="address" id={`address-${index}`} type="radio" onClick={() => selectAddress(adr)} />
                        <label htmlFor={`address-${index}`}>
                            <span> {adr.name}</span>
                            <span> {adr.phone} </span>
                            <span> {adr.city}</span>
                            <span> {adr.address}</span>
                        </label>
                        <div className="buttons">
                            {adr.selected &&
                                <>

                                    <button className="button" onClick={() => enableAddressEditForm(adr)}>edit</button>
                                    <button className="button" onClick={() => confirmDeliveryAddress(adr)}>delivery here</button>
                                </>
                            }

                        </div>

                    </div>
                ) :
                    (
                        <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            initialData={adr}
                            onCancle={() => { }}
                        />
                    )

            }
        </>
    )
}
const CheckoutPage = (props) => {
    const auth = useSelector(state => state.auth);
    const [userlogin, setUserLogin] = useState({
        email_user: "",
        password: ""
    });
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [orderSummery, setOrderSummery] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const cart = useSelector(state => state.cart);
    const { address } = auth;
    const dispatch = useDispatch();

    const inputEvent = (e) => {
        const { name, value } = e.target;

        setUserLogin((pre) => {
            return { ...pre, [name]: value };
        })
    }
    useEffect(() => {
        // if(auth.authenticate){

        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems())
        // }
    }, [auth.authenticate]);
    useEffect(() => {
        let addresss = address.map((adr) => ({
            ...adr, selected: false, edit: false
        }))
        setAddresses(addresss)
    }, [auth.address])
    const submitLoginUser = (e) => {
        e.preventDefault();
        dispatch(login(userlogin));
    }
    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        console.log(addr)
        setConfirmAddress(true);
        setOrderSummery(true);
    }
    const selectAddress = (addr) => {
        // setSelectedAddress(adr);
        const updateaddress = addresses.map((adr) =>
            adr._id === addr._id ?
                { ...adr, selected: true } : { ...adr, selected: false }
        )
        setAddresses(updateaddress);
    }
    const enableAddressEditForm = (addr) => {
        const updatedAddress = addresses.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        )
        setAddresses(updatedAddress)
    }
    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummery(true);
    }
    const userConfirmationOrder = ()=> {
        setOrderConfirmation(true);
        setOrderSummery(false);
    }
    return (
        <>
            <div className="page-container">
                <div className="checkout-container">
                    <CheckoutStep
                        title={auth.authenticate ? "profile" : "signin"}
                        step={"1"}
                        active={auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedin-id">
                                    <div>

                                        {auth.user.name}
                                    </div>
                                    <div> {auth.user.email}</div>
                                    <div>    {auth.user.phone}</div>
                                </div>
                            ) :
                                (
                                    <form onSubmit={submitLoginUser}>
                                        <div className="form-group">
                                            <input onChange={inputEvent} type="text" className="form-control" name="email_user" placeholder="email/username/phone" />
                                            <input onChange={inputEvent} type="password" className="form-control" name="password" placeholder="password" />
                                        </div>
                                        <div className="form-group buttons">
                                            <button className="form-btn">signin</button>
                                        </div>
                                    </form>
                                )
                        }
                    />
                    <CheckoutStep
                        title="address"
                        step="2"
                        active={confirmAddress && auth.authenticate}
                        body={
                            <>
                                <div className="address-container">

                                    <div className="address-body">
                                        {confirmAddress ? (
                                            <div>
                                                <div>
                                                    <span>Name: {selectedAddress.name} </span>

                                                    <span>Address :{selectedAddress.address} </span>
                                                </div>
                                                <div>

                                                    <span>Phone : {selectedAddress.phone} </span>
                                                    <span>City : {selectedAddress.city} </span>
                                                    <span> Address Type :{selectedAddress.addressType}</span>
                                                </div>
                                            </div>) : (

                                            addresses && addresses.map((adr, ind) => (

                                                <Address
                                                    key={ind}
                                                    adr={adr}
                                                    onAddressSubmit={onAddressSubmit}
                                                    selectAddress={selectAddress}
                                                    index={ind}
                                                    enableAddressEditForm={enableAddressEditForm}
                                                    confirmDeliveryAddress={confirmDeliveryAddress}
                                                />
                                            )
                                            )

                                        )}
                                    </div>
                                </div>
                            </>
                        }
                    />
                    {confirmAddress ? null : newAddress ?
                        (
                            <AddressForm step={'+'} title="add address" onSubmitForm={onAddressSubmit} />
                        ) : auth.authenticate ? (
                            <CheckoutStep
                                step="+"
                                title={"add new address"}
                                active={false}
                                onClick={() => setNewAddress(true)}
                            />
                        ) : null
                    }
                    <CheckoutStep
                    title={'order summery'}
                    step="3"
                    active={orderSummery || orderConfirmation}
                    body={
                        orderSummery ? <CartPage onlyCartItems={true}/> : 
                        orderConfirmation ?(
                            <div> 
                                {Object.keys(cart.cartItems).length} 
                            items
                            </div>
                        ) : null
                    }
                    
                    />
                    <CheckoutStep
                    title={"confirm order"}
                    active={orderConfirmation}
                        body={
                            
                            orderSummery && 
                            <Card>
                                <>
                                <div>order confirmation email will be sent to: <span className="confirm-email">{auth.user.email}</span> </div>
                                <button onClick={userConfirmationOrder}> confirm </button>
                                </>
                                 </Card>
                        }
                    />
                </div>

            </div>
        </>
    )
}

export default CheckoutPage;