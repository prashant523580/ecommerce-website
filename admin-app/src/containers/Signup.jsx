import React from 'react';
import { NavLink,Redirect } from "react-router-dom";
import img from "../img/18695.jpg";
import "./form.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { UserSignup} from '../actions';
const SignUp = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const current_user = useSelector(state => state.user);

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:"",
        phone: "",
        password:""
    });
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    if(current_user.loading){
        return <p>loading...</p>
    }
    const inputEvent = (e) => {
        const {name, value} = e.target;
        console.log(name);
        setUser((preVal=> {
            return {...preVal , [name] : value}
        }))
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

const RegisterUser = async(e) => {
    e.preventDefault();
     dispatch(UserSignup(user));
    // console.log(user)
  
}
if(auth.authenticate){
    return <Redirect to={"/"}/>
}
    return (

        <>
            <div className="form-container">
                <div className="header">
                    <div className="img-form">

                        <img src={img} alt="form-img" />
                    </div>
                    <h1>sign up</h1>
                </div>
                <form className="form" onSubmit={RegisterUser}>
                    <div className="form-group">

                        {/* <label htmlFor="firstName">full name</label> */}
                        <input type="text" onChange={inputEvent} autoComplete="off" value={user.name} className="form-input" name="name" placeholder='fullname' />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="text" onChange={inputEvent} placeholder='email' autoComplete="off" value={user.email} className="form-input" name="email" id="email" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="username">username</label> */}
                        <input type="text" onChange={inputEvent} placeholder='username' autoComplete="off" value={user.username} className="form-input" name="username" id="username" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="Phone">Phone</label> */}
                        <input type="text" onChange={inputEvent} placeholder='phone number' autoComplete="off" value={user.phone} className="form-input" name="phone" id="Phone" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="password">password</label> */}
                        <input type="password" onChange={inputEvent} placeholder='password' value={user.password} autoComplete="off" className="form-input" name="password" id="password" />
                    </div>
                    <div className="form-group">
                  
                        <label htmlFor="togglePassword"   className='checkbox-container'>
                        <input type="checkbox" onChange={togglePassword} autoComplete="off" className="form-input checkBox" name="password" id="togglePassword" />
                            <span className="checkmark"></span>
                             show password 
                        
                        </label>
                    </div>

                    <div className="btn-content">
                        <NavLink activeClassName="active" className="form-link" to='/signin'> already a member? </NavLink>
                        <button className="form-btn" >sign up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;