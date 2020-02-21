import {
  faRuler,
  faExclamationTriangle,
  faLock,
  faLockOpen,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import "./ButtonContainer.css";
import React, { useState, useEffect } from "react";
import Button from "./Button";

export default props => {
  const [isMainDisabled, setMainDisabled] = useState(false);
  const buttons = {
    calibrate: {
      caption: "CALIBRATE",
      icon: faRuler,
      slantedLeft: true,
      backgroundColor: "bg-blue-gradient",
      command: "CALIBRATE"
    },
    calibrating: {
      caption: "CALIBRATING",
      icon: faSpinner,
      spin: true,
      slantedLeft: true,
      backgroundColor: "bg-blue-gradient"
    },
    extend: {
      caption: "EXTEND",
      icon: faLock,
      backgroundColor: "bg-white-gradient"
    },
    retract: {
      caption: "RETRACT",
      icon: faLockOpen,
      backgroundColor: "bg-white-gradient"
    },
    abort: {
      caption: "ABORT",
      icon: faExclamationTriangle,
      backgroundColor: "bg-white-gradient"
    }
  };

  const handleClick = (command, disabled) => {
    if (disabled) {
      return;
    }

    setMainDisabled(true);
    if (props.stompClient) {
      props.stompClient.send("/app/send/telemetry/command", {}, command);
      console.log("Sent command: " + command);
    }
  };

  useEffect(() => {
    setMainDisabled(false);
  }, [props.state]);

  const getButton = (button, disabled = false) => {
    return (
      <Button
        caption={button.caption}
        icon={button.icon}
        spin={button.spin}
        handleClick={() => {
          handleClick(button.command, disabled);
        }}
        slantedLeft={button.slantedLeft}
        slantedRight={button.slantedRight}
        backgroundColor={button.backgroundColor}
        disabled={disabled}
      ></Button>
    );
  };

  const getMainButton = () => {
    if (props.telemetryData === null) {
      return;
    }
    const state = props.telemetryData.crucial_data.find(o => o.name === 'status').value;
    switch (state) {
      case "IDLE":
        return getButton(buttons.calibrate, isMainDisabled);
      case "CALIBRATING":
        return getButton(buttons.calibrating, true);
    }
  };

  const getBrakeButton = () => {
    return getButton(props.isBrakeRetracted ? buttons.extend : buttons.retract);
  };

  return (
    <div className="button-container">
      {getMainButton()}
      {getBrakeButton()}
      {getButton(buttons.abort)}
    </div>
  );
};
