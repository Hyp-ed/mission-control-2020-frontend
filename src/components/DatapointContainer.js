import React from "react";
import "./DatapointContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const getDatapointList = (data, path = []) => {
  if (
    data.hasOwnProperty("crucial_data") &&
    data.hasOwnProperty("additional_data")
  ) {
    return getDatapointList(data.crucial_data, ["crucial_data"]).concat(
      getDatapointList(data.additional_data, ["additional_data"])
    );
  }
  return data
    .map(nested_data => {
      if (Array.isArray(nested_data.value)) {
        return getDatapointList(nested_data.value, [...path, nested_data.name]);
      } else if (!isNaN(nested_data.value)) {
        return {
          name: nested_data.name,
          unit: nested_data.unit,
          path: [...path, nested_data.name],
          min: nested_data.min,
          max: nested_data.max
        };
      }
    })
    .flat();
};

export default function DatapointContainer(props) {
  const getDatapointTabs = () => {
    var datapoints = [];
    getDatapointList(props.data).forEach((datapoint, i) => {
      if (!datapoint) {
        return;
      }
      datapoints.push(
        <div
          className={[
            props.isSelected(datapoint) ? "selected" : "",
            props.visible ? "datapoint" : "invisible"
          ].join(" ")}
          onClick={() => props.handleDatapoint(datapoint)}
          key={i}
        >
          {datapoint.path.join(" > ")}
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
        onClick={() => props.onCloseClicked()}
        icon={faTimes}
      />
      <div className="datapoints">{getDatapointTabs()}</div>
    </div>
  );
}
