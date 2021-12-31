import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";
const Header = () => {
    return (
        <div className='header'>
            <div className="logo">
                logo
            </div>
            <div className="location">Nepal</div>
            <div className="search-box">
                <input type="search" className='search' />
                <button className='btn'><SearchIcon/></button>
            </div>
            <div className="cart">
                cart
            </div>
            <div className="account">account</div>
        </div>
    )
 }

export default Header
