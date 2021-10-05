import React from 'react';
import useDarkMode from 'use-dark-mode';
import ToggleSwitch from "../components/ToggleSwitch"

import "../App.css";
import "../css/Settings.css";

function Settings() {

    //Default darkmode setting
    const darkMode = useDarkMode(false);

    const setFontSize = (size) => {
        //do some fontsize shit here
    }

    return (
        <div id="container" className="page-content">
            Dark mode <ToggleSwitch id="darkmodetoggle" optionLabels={[]} small={true} checked={darkMode.value} onChange={darkMode.toggle} />
            <br />
            Font size?
        </div>
    )
}

export default Settings
