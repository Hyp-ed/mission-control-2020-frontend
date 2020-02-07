import {
  faRuler,
  faExclamationTriangle,
  faStop
} from "@fortawesome/free-solid-svg-icons";
import "./ButtonContainer.css";
import React from "react";
import Button from "./Button";

export default props => {
  const buttons = [
    {
      caption: "CALIBRATE",
      icon: faRuler,
      slantedLeft: true,
      slantedRight: false,
      textColor: "#FFFFFF",
      backgroundColor: "#1098AD"
    },
    {
      caption: "RETRACT BRAKES",
      icon: faStop,
      slantedLeft: false,
      slantedRight: false,
      textColor: "#000000",
      backgroundColor: "#FFFFFF"
    },
    {
      caption: "ABORT",
      icon: faExclamationTriangle,
      slantedLeft: false,
      slantedRight: false,
      textColor: "#000000",
      backgroundColor: "#FFFFFF"
    }
  ];

  const listButtons = buttons.map(button => (
    <Button
      caption={button.caption}
      icon={button.icon}
      onClick={() => {
        return;
      }}
      slantedLeft={button.slantedLeft}
      slantedRight={button.slantedRight}
      textColor={button.textColor}
      backgroundColor={button.backgroundColor}
    ></Button>
  ));

  return <div className="button-container">{listButtons}</div>;
};
