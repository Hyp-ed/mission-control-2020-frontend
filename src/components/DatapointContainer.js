import React from "react";
import "./DatapointContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DELIMITER = " > ";

const getPathObjects = (data, path = []) => {
  if (
    data.hasOwnProperty("crucial_data") &&
    data.hasOwnProperty("additional_data")
  ) {
    return getPathObjects(data.crucial_data, ["crucial_data"]).concat(
      getPathObjects(data.additional_data, ["additional_data"])
    );
  }
  return data
    .map(nested_data => {
      if (Array.isArray(nested_data.value)) {
        return getPathObjects(nested_data.value, [...path, nested_data.name]);
      } else if (!isNaN(nested_data.value)) {
        let p = [...path, nested_data.name];
        return {
          caption: p.join(DELIMITER),
          path: p
        };
      }
    })
    .flat();
};

export default function DatapointContainer(props) {
  const getDatapointTabs = () => {
    var datapoints = [];

    getPathObjects(props.data).forEach((path_obj, i) => {
      if (!path_obj) {
        return;
      }

      datapoints.push(
        <div
          className={[
            props.isSelected(path_obj.path) ? "selected" : "",
            props.visible ? "datapoint" : "invisible"
          ].join(" ")}
          onClick={() => props.handlePath(path_obj.path)}
          key={i}
        >
          {path_obj.caption}
        </div>
      );
    });
    return datapoints;
  };

  return (
    <div
      style={{ overflow: "scroll" }}
      className={props.visible ? "datapoint-container" : "invisible"}
    >
      <FontAwesomeIcon
        className="close-button"
        onClick={props.onCloseClicked}
        icon={faTimes}
      />
      <div className="datapoints">{getDatapointTabs()}</div>
    </div>
  );
}
