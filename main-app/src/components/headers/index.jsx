import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";
import {login, signout} from "../../actions"
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom';
import { Dropdown, Modal } from './nav-header/index.nav';
import { getNativeSelectUtilityClasses } from '@mui/material';
const Header = () => {
    const [loginModal,setLoginModal] = useState(false);
    const [signupModal,setSignupModal]= useState(false);
    const [user,setUser] =useState({
        name:"",
        phone:"",
        email:"",
        password:"",
        username:"",
        email_user: ""

    });
    const auth = useSelector(state => state.auth);
   
    const dispatch = useDispatch();
    const InputEvent = (e) => {
            const {name,value} = e.target;
            // console.log(name,value)
            setUser((preval) =>{
                return{...preval,[name] : value}
            })
    }
    const submitSignup = (e) => {
        e.preventDefault();
          
    }
    const submitLogin = (e) => {
        e.preventDefault();
     
        dispatch(login(user));
    
    }
    const logout = () => {
        dispatch(signout());
    }
    const modal = () => {
        return(
            <>
            <Modal title={ signupModal ? 'sign up' :'login  ' } visible={loginModal} onClick={()=> setLoginModal(false)}>
                <form action="" onSubmit={signupModal ? submitSignup : submitLogin}>
                    {
                        signupModal && <>
                <div className="form-group">
                        <label htmlFor="">full name</label>
                        <input name='name' value={user.name} onChange={InputEvent} type="text" placeholder='fullname' className='input-control'/>
                    </div> 
                       <div className="form-group">
                       <label htmlFor="">username</label>
                       <input name='username' value={user.username} onChange={InputEvent} type="text" placeholder='username' className='input-control'/>
                   </div>
                        
                    <div className="form-group">
                        <label htmlFor="">phone number</label>
                        <input name='phone' value={user.phone} onChange={InputEvent} type="text" placeholder='phone number' className='input-control'/>
                    </div>
                    <div className="form-group">
                       <label htmlFor="">email</label>
                       <input name="email" value={user.email} onChange={InputEvent} type="email" className='input-control' placeholder='Xyz@example.com' />
                   </div>
                   </>
                    }
                    {!signupModal &&
                    <div className="form-group">
                       <label htmlFor="">email/username</label>
                       <input name="email_user" value={user.email_user} onChange={InputEvent} type="email" className='input-control' placeholder='Xyz@example.com' />
                   </div>
                    }
                    <div className="form-group">
                        <label htmlFor="">password</label>
                        <input name='password' value={user.password} onChange={InputEvent} type="password" placeholder='password' className='input-control'/>
                    </div>
                    <div className="buttons">
                        <button className="form-btn" onClick={() => setLoginModal(false)}>cancle</button>
                        <button className="form-btn">{signupModal ? "sign up" : "login"}</button>
                    </div>
                </form>
            </Modal>
            </>
        )
    }
    const renderNonLoginMenu = () => {
        return(
            <Dropdown 
            menu={
                <a>
                    More
                </a>
            }
            menus={[
                {label:'Profile',href:"",icon:null},
                {label:"shop zone", href:"",icon: null},
                {
                    label:"order",
                    href: '/account/orders',
                    icon:null,
                    onClick : () => {
                        setLoginModal(true);
                    }
                }
            ]}
            setFormMenu ={
                <div style={{display:"flex",
                            justifyContent:"space-around" 
                }}>
                    <a onClick={() => {
                    setSignupModal(false);
                    setLoginModal(true);
                }}> login </a> &nbsp;&nbsp;&nbsp;
                    <a onClick={() => {
                        setLoginModal(true);
                        setSignupModal(true)
                    }}> sign up</a>
                </div>
            }
            />

            
        )
    }
    const renderLoginMenu = () => {
        return(
            <Dropdown
            menu={
                <a>user name </a>
            }
            menus={[
                { label: "My Profile", href: "", icon: null },
                {
                  label: "Orders",
                  href: `/account/orders`,
                  icon: null,
                },
                { label: "Wishlist", href: "", icon: null },
                { label: "My Chats", href: "", icon: null },
                { label: "Rewards", href: "", icon: null },
                { label: "Notifications", href: "", icon: null },
                {label :"Logout", icon:'null', onClick: logout }
            ]}
            />
        )
    }
    return (
        <div className='header'>
            <div className="logo">
                <NavLink className={'icon'} to='/'>logo</NavLink>
            </div>
            <div className="location">Nepal</div>
            <div className="search-box">
                <input type="search" className='search' />
                <button className='btn'><SearchIcon/></button>
            </div>
            <div className="account">
                {
                   auth.authenticate ? renderLoginMenu() : renderNonLoginMenu()
                } 
                {/* <span onClick={() => setLoginModal(true)}>
                    login
                </span>  */}
                </div>
            
                <div className="cart">
                    <a href="/cart"> cart</a>
                </div>
            {modal()}
        </div>
    )
 }

export default Header
