import React,{useEffect} from 'react';
import { NavLink,Redirect } from "react-router-dom";
import img from "../img/18695.jpg";
import "./form.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { userSignup} from '../actions';
import Modal from './ui/modal/Modal';
import { userConstants } from '../actions/constant';
const SignUp = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const current_user = useSelector(state => state.user);

    const [errorModal,setErrorModal] = useState(false);
    const [error, setError] = useState('');

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:"",
        phone: "",
        password:""
    });
    const showErrorModal = () => {
        
        return(
            <>
            <Modal 
            close={() => setErrorModal(false)}
            show={errorModal} header={"error"} classname={"error"} children={
                <p > {error}</p>
            }/>
            </>
        )
    }
   useEffect(() => {
       if(current_user.error){

           setError(current_user.error);
               setErrorModal(true);
    }
        setTimeout(() => {

            dispatch({
                type:userConstants.USER_REGISTER_FAILURE,
                payload:{
                    error: ""
                }
            })
        },6000);
},[current_user.error]);
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    if(current_user.loading){
        return <p>loading...</p>
    }
    const inputEvent = (e) => {
        const {name, value} = e.target;
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

const registerUser = (e) => {
    e.preventDefault();
     dispatch(userSignup(user));
    console.log(user)
  
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
                <form className="form" onSubmit={registerUser}>
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

            {error && showErrorModal() }
        </>
    )
}

export default SignUp;