import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

export default function Button(props) {
  
  function slantStyle() {
      var style = ["button-container"];
      if (props.slantedLeft) {
        style.push("button-container-leftslant");
      }
      if (props.slantedRight) {
        style.push("button-container-rightslant");
      }

      return style.join(" ");
  }

  return (
    <div
      className={slantStyle()}
      onClick={props.onClick}
      style={{ 
        color: props.textColor,
        backgroundColor: props.backgroundColor,
        width: props.width, 
        fontSize: props.fontSize}}>
          <div 
            className="button-caption"
            style={{
                    display: "flex",
                    alignItems: "center",
                    }}>
              <FontAwesomeIcon className="button-icon" icon={props.icon} />
              <span>{props.caption}</span>
          </div>  
      </div>
  );
}

Button.defaultProps = {
  width: "32%",
}
