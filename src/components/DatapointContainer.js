import React from "react";
import "./DatapointContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const getDatapointList = (lists, tree) => {
  if (
    lists.hasOwnProperty("crucial_data") &&
    lists.hasOwnProperty("additional_data")
  ) {
    return getDatapointList(lists.crucial_data, ["crucial_data"]).concat(
      getDatapointList(lists.additional_data, ["additional_data"])
    );
  }
  return lists
    .map(list => {
      if (Array.isArray(list.value)) {
        return getDatapointList(list.value, [...tree, list.name]);
      } else if (!isNaN(list.value)) {
        return {
          name: list.name,
          unit: list.unit,
          tree
        };
      }
    })
    .flat();
};

export default function DatapointContainer(props) {
  const getDatapointTabs = () => {
    var datapoints = [];
    getDatapointList(props.data, []).forEach(datapoint => {
      if (datapoint && datapoint.hasOwnProperty("name")) {
        let path = datapoint.tree
          ? [...datapoint.tree, datapoint.name]
          : [datapoint.name];
        datapoints.push(
          <div
            className={[
              props.getDatapointIndex(props.selectedDatapoints, datapoint) > -1
                ? "selected"
                : "",
              props.visible ? "datapoint" : "invisible"
            ].join(" ")}
            onClick={() => props.handleDatapoint(datapoint)}
          >
            {path.join(" > ")}
          </div>
        );
      }
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

DatapointContainer.defaultProps = {
  selectedDatapoints: []
};
