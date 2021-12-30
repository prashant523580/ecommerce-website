import React, { useEffect } from "react";
import { useState } from "react";
// import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import { useDispatch } from "react-redux";
import {NavLink} from "react-router-dom";
import { signout } from "../actions";
import "./navbar.css";
const NavBars = (props) => {
    // const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [windowScroll, setWindowScroll] = useState({
        prevScroll:"",
        currScroll:""
    });
    const [top , setTop] = useState(0);
    const [padding,setPadding] = useState({
        topBottom:"",
        leftRight:'',
    })
    let logoutLocalStorage =  localStorage.getItem("token");
    // console.log(logoutLocalStorage)
    const logOutUser = () => {
        dispatch(signout())
        // localStorage.clear()
    }
    const RenderMenuLoginUser = () => {
            return (
                <>
                   {/* <NavLink exact activeClassName="active" className="nav-link" to="/">home</NavLink>
                <NavLink exact activeClassName="active" className="nav-link" to="/category">Category</NavLink>
                <NavLink exact activeClassName="active" className="nav-link" to="/products">products</NavLink>
                <NavLink exact activeClassName="active" className="nav-link" to="/orders">orders</NavLink>
                           */}
                <span  className="nav-link" onClick={logOutUser}>logout</span>            
                 </>
                )

    }
    const RenderMenuNonLoginUser = () => {
            return (
                    <>
                     
                  <NavLink exact activeclassname="active" className="nav-link" to="/signin">sign in</NavLink>
                <NavLink exact activeclassname="active" className="nav-link" to="/signup">sign up</NavLink>
                 
                    </>
            )
    }
    let prevScroll = window.scrollY;
    window.onscroll = function(e){
        let currentScroll = window.scrollY;
        setWindowScroll((pre => {
            return {...pre ,prevScroll,currScroll:currentScroll}
        }))

        // if(currentScroll >= 20){
        //     setPadding((pre) => {
        //         return{
        //             // ...pre,
        //             topBottom:"0px",
        //             leftRight:"4px"
        //         }
        //     })
        // }else{

        //     setPadding((pre) => {
        //         return{
        //             // ...pre,
        //             topBottom:"12px",
        //             leftRight:"10px"
        //         }
        //     })
        // }
       if(Number(windowScroll.prevScroll) > Number(windowScroll.currScroll)) {
           setTop(0)
        }  else{
           
         setTop(-150);
       }
    //    prevScroll = currentScroll
    }
    useEffect(() => {
    },[]);
    return (
        <>
    
 <nav style={{top:top, padding:padding.topBottom + " "+ padding.leftRight}}>
     <div className="responsive">

         <div className="nav-logo">
             <div className="logo">
                 <h3> shopping</h3>
             </div>
         </div>
         <label htmlFor="menu">
             <div className="menu">
                 icon
             </div>
         </label>
     </div>
     <input type="checkbox" id="menu" />
     <div className="nav-links">
     {logoutLocalStorage ? RenderMenuLoginUser() : RenderMenuNonLoginUser()}
         </div>
 </nav> 
        </>
    )
}

export default NavBars;