import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidenav.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PagesIcon from '@mui/icons-material/Pages';
const Sidenav = (props) => {
    const [menuWidth,setMenuWidth] = useState(50);
    const [rotate,setRotate] = useState(0)
    const [linkText,setLinkText] = useState("none");
    // console.log(items);
    let navlinks = [
        {
            link: "home",
            icon: <HomeIcon/>,
            path: "/"
        },
        {
            link:"category",
            icon: <CategoryIcon/>,
            path:"/category"
        },
        {
            link:"product",
            icon: <ShoppingBagIcon/>    ,
            path:"/products"
        },
        {
            link:"pages",
            icon:<PagesIcon/>,
            path: "/pages"
        },{
            link:"order",
            icon:<FactCheckIcon/>,
            path: "/orders"
        }
    ];
    const toggleMenu = ()  => {
        if(menuWidth === 50){
            setMenuWidth(250);
            setLinkText("block");
            setRotate(180);
        }else{
            setLinkText("none");
            setMenuWidth(50);
            setRotate(360);
        }
    }
    return(
        <>
        <div className="side-nav">
            <div className="nav-links" style={{width:menuWidth+"px"}}>

            <div className="menu-icon">
                <ArrowForwardIosIcon onClick={toggleMenu} style={{transform:`rotate(${rotate}deg)`}} /> 
            </div>
            {
                navlinks.map((navlink,ind) => {
                    return(
                        <NavLink key={ind} exact activeclassname="active" to={navlink.path}>{navlink.icon} <span style={{display:linkText}}>{navlink.link} </span></NavLink>
                        )
                    })
                }
                </div>
        </div>
        </>
    )      
}


export default Sidenav;