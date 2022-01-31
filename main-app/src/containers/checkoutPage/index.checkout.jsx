import React from "react";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import "./style.css";
const CheckoutStep = (props) => {
    return (
        <>
            <div className="checkout">
                <div className={`checkout-header ${props.active && "active"}`}>
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

const CheckoutPage = (props) => {
    const auth = useSelector(state => state.auth);

    return (
        <>
            <div className="page-container">
                <div className="checkout-container">
                    <CheckoutStep
                        title={ auth.authenticate ? "profile":"signin"}
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
                                    <form>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="name" placeholder="full name" />
                                            <input type="text" className="form-control" name="email" placeholder="email" />
                                        </div>
                                    </form>
                                )
                        }
                    />
                    <CheckoutStep
                        title="address"
                        step="2"
                        body={
                            <>
                                <h1>Address 1</h1>
                            </>
                        }
                    />
                    <AddressForm
                        title={"add new address"}
                        step={"3"}
                        active={false}
                    />
                </div>

            </div>
        </>
    )
}

export default CheckoutPage;