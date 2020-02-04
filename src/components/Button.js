import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

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
      style={{ width: "33%" }}
    >
      <div
        className={buttonSkewClassName}
        style={{
          color: props.textColor,
          backgroundColor: props.backgroundColor,
          height: 100+"%"
        }}
      >
      <div className={buttonUnskewClassName}>
        <FontAwesomeIcon className="button-icon" icon={props.icon} />
        <span>{props.caption}</span>
      </div>
    </div>
    </div>
  );
}
