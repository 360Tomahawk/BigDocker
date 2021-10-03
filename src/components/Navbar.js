import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';

import {FaDocker} from "react-icons/fa";
import {NavbarData} from './NavbarData';
import  "../css/Navbar.css"

import ToggleSwitch from './ToggleSwitch';

function Navbar() {

    const [darkmode, setDarkMode] = useState(false);

    const onDarkModeChange = (checked) => {
        setDarkMode(checked);
    }

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="headerbar">
                <div className="app-title"><FaDocker/>BigDocker</div>
                <div className="darkmodeToggle">Dark mode<ToggleSwitch id="darkmodetoggle" optionLabels={[]} small={true} checked={darkmode} onChange={onDarkModeChange} /></div>
            </div>
            <nav className='nav-menu'>
                {/* Hide the sidebar if anything is clicked */}
                <ul className='nav-menu-items'>
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
