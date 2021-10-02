import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';

import {FaBars, FaDocker} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {NavbarData} from './NavbarData';
import  "../../css/Navbar.css"

function Navbar() {

    const [navbar, setNavbar] = useState(false);

    const showNavbar = () => setNavbar(!navbar);

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                   <FaBars onClick={showNavbar}/> 
                </Link>
                <div className="app-title"><FaDocker/>BigDocker</div>
            </div>
            <nav className={navbar ? 'nav-menu active' : 'nav-menu'}>
                {/* Hide the navbar if anything is clicked */}
                <ul className='nav-menu-items' onClick={showNavbar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiOutlineClose />
                        </Link>
                    </li>
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