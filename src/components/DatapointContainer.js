import React from "react";
import "./DatapointContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAllPaths } from "../DataTools";

export default function DatapointContainer(props) {
  // TODO: GLOBAL make everything Camel case

  /**
   * Create an array of data point divs
   *
   * @returns an array of data point divs
   */
  const getPathList = () => {
    const paths = getAllPaths(props.data);
    return paths
      .filter(path => path !== undefined)
      .map((path, i) => {
        return (
          <div
            className={[
              props.isSelected(path.path) ? "datapoint--selected" : "",
              "datapoint"
            ].join(" ")}
            onClick={() => props.onDataPointClicked(path.path)}
            key={i}
          >
            {path.caption}
          </div>
        );
      });
  };

  // TODO: get rid of inline styles

  return (
    <div className={props.visible ? "datapoint-container" : "invisible"}>
      <FontAwesomeIcon
        className="close-button"
        onClick={props.onCloseClicked}
        icon={faTimes}
      />
      <div className="content">{getPathList()}</div>
    </div>
  );
}
