import React, { useState, useEffect } from "react";
import "./Tabs.css";
import Button from "./Button.js"
import {faTerminal,
        faChartBar,
        faProjectDiagram} from "@fortawesome/free-solid-svg-icons";

export default function Tabs(props) {
    const [activeTabs, setActiveTabs] = useState([false,false,true]);

    const handleTabClick = (tabIndex) => {
        var newTabArray = [false,false,false];
        newTabArray[tabIndex] = true;
        setActiveTabs(newTabArray);
    }

    return (
        <div className="tabs-root">
            <div className="tabs-container">
                <Button
                    caption="TERMINAL"
                    icon={faTerminal}
                    onClick={() => {
                        handleTabClick(0);
                        return;
                    }}
                    isInactive={!activeTabs[0]}
                    width="32%"
                    // slantedRight
                    textColor="#000000"
                    backgroundColor="#FFFFFF"/>
                <Button
                    caption="GRAPHS"
                    icon={faChartBar}
                    onClick={() => {
                        handleTabClick(1);
                        return;
                    }}
                    isInactive={!activeTabs[1]}
                    width="30%"
                    // slantedRight
                    textColor="#000000"
                    backgroundColor="#FFFFFF"/>
                <Button
                    caption="STATUS"
                    icon={faProjectDiagram}
                    onClick={() => {
                        handleTabClick(2);
                        return;
                    }}
                    isInactive={!activeTabs[2]}
                    width="32%"
                    slantedRight
                    textColor="#000000"
                    backgroundColor="#FFFFFF"/>
            </div>
            <div className="window-container">
                
            </div>
        </div>
    );    
}