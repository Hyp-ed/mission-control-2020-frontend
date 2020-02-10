import React from "react";
import "./DataHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default props => {
  return (
    <div className={"data-header level-" + props.level}>
      {props.level > 0 && <div className="data-header-line"></div>}
      <div className="data-header-content">
        <div className="data-header-title">{props.title}</div>
        <FontAwesomeIcon
          className="data-header-caret"
          icon={faCaretDown}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
