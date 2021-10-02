import React from 'react'
import {IoIosPaper, IoIosHelpCircle, IoIosSettings} from "react-icons/io";
import {AiFillHome, AiFillDatabase} from "react-icons/ai";

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Sandbox',
        path: '/SageCells',
        icon: <IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title: 'Help',
        path: '/Help',
        icon: <IoIosHelpCircle/>,
        cName: 'nav-text'
    },
    {
        title: 'My Storage',
        path: '/Storage',
        icon: <AiFillDatabase/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/Settings',
        icon: <IoIosSettings/>,
        cName: 'nav-text'
    }
]