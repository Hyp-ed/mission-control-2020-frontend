import React, { useState } from "react";
import "./Tabs.css";
import Button from "../Button/Button";
import {
  faTerminal,
  faChartBar,
  faProjectDiagram
} from "@fortawesome/free-solid-svg-icons";
import Terminal from "../Terminal/Terminal";
import Status from "../Status/Status";

export default function Tabs(props) {
  const [activeTabs, setActiveTabs] = useState([true, false, false]);

  const handleTabClick = tabIndex => {
    var newTabArray = [false, false, false];
    newTabArray[tabIndex] = true;
    setActiveTabs(newTabArray);
  };

  const getBackgroundColor = isInactive => {
    if (isInactive) {
      return "bg-transparent";
    } else {
      return "bg-white";
    }
  };

  return (
    <div className="tabs-root">
      <div className="tabs-container">
        <Button
          caption="TERMINAL"
          icon={faTerminal}
          handleClick={() => {
            handleTabClick(0);
            return;
          }}
          backgroundColor={getBackgroundColor(!activeTabs[0])}
        />
        <Button
          caption="GRAPHS"
          icon={faChartBar}
          handleClick={() => {
            handleTabClick(1);
            return;
          }}
          backgroundColor={getBackgroundColor(!activeTabs[1])}
        />
        <Button
          caption="STATUS"
          icon={faProjectDiagram}
          handleClick={() => {
            handleTabClick(2);
            return;
          }}
          backgroundColor={getBackgroundColor(!activeTabs[2])}
          slantedRight
        />
      </div>
      <div className="window-container">
        <Terminal
          isInactive={!activeTabs[0]}
          terminalOutput={props.terminalOutput}
          stompClient={props.stompClient}
        />
        <Status isInactive={!activeTabs[2]} />
      </div>
    </div>
  );
}
