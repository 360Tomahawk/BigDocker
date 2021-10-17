import React from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';

import useDarkMode from 'use-dark-mode';
import ToggleSwitch from "../components/ToggleSwitch"

import {IoMdMoon} from "react-icons/io";
import {FaDocker} from "react-icons/fa";

import {NavbarData} from './NavbarData';
import  "../css/Navbar.css"

function Navbar() {

    const darkMode = useDarkMode(false);

    return (
        <>
        <IconContext.Provider value={{color:'#fff', className:"iconstyle"}}>
            <div className="headerbar">
                <Link to="/" className="app-title"><FaDocker/>BigDocker</Link>
                <div className="darkmodeStuff">
                    <IoMdMoon size={20}/><ToggleSwitch id="darkmodetoggle" optionLabels={[]} small={true} checked={darkMode.value} onChange={darkMode.toggle} />
                </div>
            </div>
            <nav className='nav-menu'>
                {/* Hide the sidebar if anything is clicked */}
                <ul className='nav-menu-items'>
                    {NavbarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path} className={"btn" + item.title}>
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
