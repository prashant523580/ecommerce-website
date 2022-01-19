import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { login, signout } from "../../actions"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Dropdown, Modal } from './nav-header/index.nav';
import { getNativeSelectUtilityClasses } from '@mui/material';
import { authConstants } from '../../actions/constant';
import loginImg from "../../img/Login-illustration.svg";
const Header = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [errorModal,setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        username: "",
        email_user: ""

    });
    const auth = useSelector(state => state.auth);
    const current_user = useSelector(state=> state.user);

    const dispatch = useDispatch();
  
   useEffect(() => {
           setError(auth.error);
            setErrorModal(true);
    
        setTimeout(() => {

            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{
                    error: ""
                }
            })
        },6000);
},[auth.error]);
const showErrorModal = () => {
        
    return(
        <>
        <Modal 
        onClick={() => setErrorModal(false)}
        visible={errorModal}
        title={"error"} classname={"error"} children={
            <p > {error}</p>
        }/>
        </>
    )
}
    const InputEvent = (e) => {
        const { name, value } = e.target;
        // console.log(name,value)
        setUser((preval) => {
            return { ...preval, [name]: value }
        })
    }
    const submitSignup = (e) => {
        e.preventDefault();
        setLoginModal(false);
    }
    const submitLogin = (e) => {
        e.preventDefault();

        dispatch(login(user));
        setLoginModal(false);

    }
    const logout = () => {
        dispatch(signout());
    }
    const modal = () => {
        return (
            <>
                <Modal visible={loginModal} onClick={() => setLoginModal(false)}>
                    {/* <div className="info"> */}
                        <div className="content">
                                {signupModal ? <h3>sign up</h3> : <h3>sign in</h3>}
                                <div className="content-body">
                                    <img src={loginImg} />
                                </div>
                                <div className="link-form">
                                    {signupModal ?<>
                                         <p >already signup ? <span onClick={() => {
                                             setSignupModal(false)
                                             
                                            }}> signin here</span>  </p>
                                            <p> <span style={{color:"white"}}><FacebookOutlinedIcon/></span> </p>
                                            </>
                                             : <p   
                                    > not a member ? <span onClick={() => {
                                        setSignupModal(true)
                                    }}> signup here</span></p>}
                                </div>
                        </div>
                    {/* </div> */}
                    <form action="" onSubmit={signupModal ? submitSignup : submitLogin}>
                        {
                            signupModal && <>
                                <div className="form-group">
                                    <label htmlFor="">full name</label>
                                    <input autoComplete='off' name='name' value={user.name} onChange={InputEvent} type="text" placeholder='fullname' className='input-control' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">username</label>
                                    <input autoComplete='off' name='username' value={user.username} onChange={InputEvent} type="text" placeholder='username' className='input-control' />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">phone number</label>
                                    <input autoComplete='off' name='phone' value={user.phone} onChange={InputEvent} type="text" placeholder='phone number' className='input-control' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">email</label>
                                    <input autoComplete='off' name="email" value={user.email} onChange={InputEvent} type="email" className='input-control' placeholder='Xyz@example.com' />
                                </div>
                            </>
                        }
                        {!signupModal &&
                            <div className="form-group">
                                <label htmlFor="">email/username</label>
                                <input autoComplete='off' name="email_user" value={user.email_user} onChange={InputEvent} type="email" className='input-control' placeholder='Xyz@example.com' />
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="">password</label>
                            <input autoComplete='false' name='password' value={user.password} onChange={InputEvent} type="password" placeholder='password' className='input-control' />
                        </div>
                        <div className="form-group">
                            <div className='social-media'>  
                                <button style={{display: "flex", justifyContent:"center",alignItems:"center"}}>
                                     sign in with &nbsp;<FacebookOutlinedIcon/>
                                    </button>
                                      </div>
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
        return (
            <Dropdown
                menu={
                    <a>
                        More
                    </a>
                }
                menus={[
                    { label: 'Profile', href: "", icon: null },
                    { label: "shop zone", href: "", icon: null },
                    {
                        label: "order",
                        href: '/account/orders',
                        icon: null,
                        onClick: () => {
                            setLoginModal(true);
                        }
                    }
                ]}
                setFormMenu={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around"
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
        return (
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
                    { label: "Logout", icon: 'null', onClick: logout }
                ]}
            />
        )
    }
    return (
        <div className='main-header'>
            <div className="head logo">
                <NavLink className={'icon'} to='/'>logo</NavLink>
            </div>
            <div className="head location">Nepal</div>
            <div className="head search-box">
                <input type="text" className='search' />
                <button className='btn'><SearchIcon /></button>
            </div>
            <div className="head account">
                {
                    auth.authenticate ? renderLoginMenu() : renderNonLoginMenu()
                }
                {/* <span onClick={() => setLoginModal(true)}>
                    login
                </span>  */}
            </div>

            <div className="head cart-page">
                <a href="/cart"> <ShoppingCartOutlinedIcon/></a>
            </div>
            {error ? showErrorModal(): null}
            {modal()}
        </div>
    )
}

export default Header
