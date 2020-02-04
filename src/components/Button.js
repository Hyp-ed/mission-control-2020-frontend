import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

export default function Button(props) {
  // known issue: both sides cannot be slanted

  const buttonSkewClassName = `button-slant ${
    props.slantedLeft ? "slant__left slant-margin__left" : ""
  } ${props.slantedRight ? "slant__right slant-margin__right" : ""}`;

  const buttonUnskewClassName = `${props.slantedLeft ? "slant__right" : ""} ${
    props.slantedRight ? "slant__left" : ""
  }`;

  return (
    <div
      className="button-container"
      onClick={props.onClick}
      style={{ width: "32%" , fontSize: props.fontSize}}
    >
      <div
        className={buttonSkewClassName}
        style={{
          color: props.textColor,
          backgroundColor: props.backgroundColor,
          height: 100+"%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
      <div 
        className={buttonUnskewClassName}
        style={{display: "inherit",
                alignItems: "center",
                marginBottom: 5+"%"}}>
          <FontAwesomeIcon className="button-icon" icon={props.icon} />
          <span>{props.caption}</span>
      </div>
    </div>
    </div>
  );
}
