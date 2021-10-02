import React from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';

import {FaDocker} from "react-icons/fa";
import {NavbarData} from './NavbarData';
import  "../css/Navbar.css"

function Navbar() {

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="sidebar">
                <div className="app-title"><FaDocker/>BigDocker</div>
            </div>
            <nav className='nav-menu'>
                {/* Hide the sidebar if anything is clicked */}
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'></li>
                    {NavbarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar
