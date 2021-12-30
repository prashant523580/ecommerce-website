import React from 'react';
import { login } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import img from "../img/4115337.jpg"
import "./form.css";
const SignIn = (props) => {
    const dispatch = useDispatch();
    const [email_user, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
   
    const userLogin = (e) => {
        e.preventDefault();
        console.log("clicked")
        const user = {
            email_user,
            password
        }
        dispatch(login(user));
    }
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    const togglePassword = () => {
        let pass = document.getElementById("password");
        // console.log(pass);
        if (pass.type === "password") {
            pass.type = "text"
        } else {
            pass.type = "password"
        }
    }
    return (
        <>
            <div className="form-container">
                <div className="header">
                    <div className="img-form">
                        <img src={img} alt="form-img" />
                    </div>
                    <h1>sign in</h1>
                </div>
                <form className="form" onSubmit={userLogin} >
                    <div className="form-group">

                        {/* <label htmlFor="username">username/email</label> */}
                        <input type="text" placeholder='username/email' onChange={(e) => setEmail(e.target.value)} value={email_user} autoComplete="on" className="form-input" name="username" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="password">password</label> */}
                        <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="off" className="form-input" name="password" id="password" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="togglePassword"   className='checkbox-container'>
                        <input type="checkbox" onChange={togglePassword} autoComplete="off" className="form-input checkBox" name="password" id="togglePassword" />
                            <span className="checkmark"></span>
                             show password 
                        </label>
                    </div>
                    <div className="btn-content">
                        <NavLink activeClassName="active" className="form-link" to='/signup'> not a member </NavLink>
                        <button className="form-btn" >sign in</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignIn;