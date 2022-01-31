import React from "react";
import { useState } from "react";
const AddressForm = (props) => {
    const { initialData } = props;
    const [address, setAddress] = useState({
        name:"",
        phone:"",
        address:"",
        city:"",
        pinCode:"",
        addressType:""
    });
    const inputEvent = (e) =>{
        const {name,value} = e.target;
        setAddress((preval) => {
            return {...preval,
                    [name]  : value
                }
        })
        console.log(address)
    }
    const renderAddressForm = () => {
        return(
            <div className="address-form">
                <form action="">
                    <div className="form-group">
                        <input onChange={inputEvent} type="text" className="form-control" name="name" placeholder="full name" />
                        <input onChange={inputEvent} type="text" className="form-control" name="phone" placeholder="phone number" />
                    </div>
                    <div className="form-group">
                        <input onChange={inputEvent} type="text" className="form-control" name="pinCode" placeholder="pinCode" />
                        <input onChange={inputEvent} type="text" className="form-control" name="address" placeholder="addresss" />
                    </div>
                    <div className="form-group">
                        <input onChange={inputEvent} type="text" className="form-control" name="city" placeholder="city" />
                        <div className="address-type">
                            <label htmlFor="">address type</label>
                            <div className="form-group">

                            <input onChange={inputEvent} name="addressType" value={"home"} type="radio" id="home" />
                            <label htmlFor="home">home</label>
                            </div>
                            <div className="form-group">

                            <input onChange={inputEvent} type="radio" id="work" name="addressType" value={"work"}  />
                            <label htmlFor="work">work</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <>
            <div className="checkout">
                <div className={`checkout-header ${props.active && "active"}`}>
                    <div className="step-number">{props.step}</div>
                    <div className="title">{props.title}</div>
                </div>
                <div className="checkout-body">
                    {renderAddressForm()}
                </div>
                <div className="checkout-footer">
                  
                </div>
            </div>
        </>
    )
}

export default AddressForm;