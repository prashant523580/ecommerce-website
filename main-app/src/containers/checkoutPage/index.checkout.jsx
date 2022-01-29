import React from "react";

const CheckoutStep = (props) => {
    return(
        <>
                  <div className="checkout">
                <div className={`checkout-header ${props.active && "active" }`}>
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
    

    return(
            <>
            <div className="page-container">
                <div className="checkout-container">
                    <CheckoutStep
                    title={"signin"}
                    step={"1"}
                    active={true}
                    />
                </div>
            </div>
            </>
    )
}

export default CheckoutPage;