import React from 'react';
import './style.css'
const Header=({children}:any)=>{
    return(
        <div className='header-home'>
            <div className="header-home__logo">CV</div>
            <div className='header-home__body'>
                {children}
            </div>
        </div>
    )
}
export default Header;