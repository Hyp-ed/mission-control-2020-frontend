import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

export default function Button(props) {
  const leftSlantStyle = props.slantedLeft 
                          ? {clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                            backgroundColor: props.backgroundColor}
                          : {backgroundColor: props.backgroundColor};

  const rightSlantStyle = props.slantedRight 
                          ? {clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                            backgroundColor: props.backgroundColor}
                          : {backgroundColor: props.backgroundColor};

  return (
    <div
      className="button-container"
      onClick={props.onClick}
      style={{ 
        color: props.textColor,
        width: props.width, 
        fontSize: props.fontSize}}>
          <div
            className="left-slant"
            style={leftSlantStyle}
          >
          </div>
          <div 
            className="button-caption"
            style={{backgroundColor: props.backgroundColor,
                    display: "flex",
                    alignItems: "center",}}>
              <FontAwesomeIcon className="button-icon" icon={props.icon} />
              <span>{props.caption}</span>
          </div>
          <div 
            className="right-slant"
            style={rightSlantStyle}>
          </div>      
      </div>
  );
}

Button.defaultProps = {
  width: "32%",
}
