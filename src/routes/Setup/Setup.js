import React from "react";
import "./Setup.css";
import SetupLogo from "../SetupLogo/SetupLogo";
import Button from "../../components/Button/Button";
import { faPlay, faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Setup() {
  const fakeSystems = [
    "IMU",
    "IMU FAIL",
    "Batteries",
    "Batteries FAIL",
    "Keyence",
    "Keyence FAIL",
    "Temperature",
    "Temperature FAIL",
    "Embrakes",
    "Motors",
    "Battery test",
    "High power"
  ];

  const additional = ["Debug-system off"];

  const getChoiceList = choices => {
    return choices.map(choice => (
      <div className="input-group-switch">
        <input type="checkbox" class="switch"></input>
        <label>{choice}</label>
      </div>
    ));
  };

  const handleRunClick = () => {
    console.log("run");
  };

  const handleCompileClick = () => {
    console.log("compile");
  };

  // TODO: fittext
  return (
    <div className="setup-wrapper centered">
      <SetupLogo></SetupLogo>
      <div className="input-group">
        <label>IP address</label>
        <input></input>
      </div>
      <div className="input-group">
        <label>Fake systems</label>
        <div className="input-group-multiple">{getChoiceList(fakeSystems)}</div>
      </div>
      <div className="input-group">
        <label>Additional values</label>
        <div className="input-group-multiple">{getChoiceList(additional)}</div>
      </div>
      <div className="setup-wrapper-buttons">
        <Button
          caption="RUN"
          handleClick={handleRunClick}
          backgroundColor="bg-white-gradient"
          icon={faPlay}
        ></Button>
        <Button
          caption="COMPILE & RUN"
          handleClick={handleCompileClick}
          backgroundColor="bg-white-gradient"
          icon={faCogs}
        ></Button>
      </div>
    </div>
  );
}
