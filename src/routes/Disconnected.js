import React from "react";
import "./Disconnected.css";
import SetupLogo from "./SetupLogo";
import { faExclamationTriangle, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";

export default function Disconnected() {
  const handleClick = () => {
    console.log("reconnect");
  }

  return (
    <div className="disconnected-wrapper centered">
      <SetupLogo></SetupLogo>
      <div className="disconnected-wrapper-content">
        <FontAwesomeIcon className="icon" icon={faExclamationTriangle}></FontAwesomeIcon>
        There is no connection to the base-station.
      </div>
      <Button caption="RETRY" handleClick={handleClick} backgroundColor="bg-white-gradient" icon={faSync}></Button>
    </div>
  );
}
