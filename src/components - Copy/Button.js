import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

export default function Button(props) {
  function slantStyle() {
    var style = ["button"];
    if (props.slantedLeft) {
      style.push("button-leftslant");
    }
    if (props.slantedRight) {
      style.push("button-rightslant");
    }

    return style.join(" ");
  }

  return (
    <div
      className={slantStyle()}
      onClick={props.onClick}
      style={{
        color: props.textColor,
        backgroundColor: props.backgroundColor
      }}
    >
      <div className="button-caption">
        <FontAwesomeIcon className="button-icon" icon={props.icon} />
        <span>{props.caption}</span>
      </div>
    </div>
  );
}
