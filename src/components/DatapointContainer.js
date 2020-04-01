import React from "react";
import "./DatapointContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DELIMITER = " > ";

export default function DatapointContainer(props) {
  // TODO: GLOBAL make everything Camel case

  // TODO: can merge with getDataPoint???
  /**
   * Recursively walk the data object using a list of keys.
   *
   * @param {object} data – object to be walked
   * @param {array} path – contains object keys
   * @returns array of data point objects containing path and caption
   */
  const getDataPoints = (data, path = []) => {
    if (
      data.hasOwnProperty("crucial_data") &&
      data.hasOwnProperty("additional_data")
    ) {
      return getDataPoints(data.crucial_data, ["crucial_data"]).concat(
        getDataPoints(data.additional_data, ["additional_data"])
      );
    }
    return data
      .map(nestedData => {
        if (Array.isArray(nestedData.value)) {
          return getDataPoints(nestedData.value, [...path, nestedData.name]);
        }
        if (!isNaN(nestedData.value)) {
          let p = [...path, nestedData.name];
          return {
            caption: p.join(DELIMITER),
            path: p
          };
        }
        return undefined;
      })
      .flat();
  };

  /**
   * Create an array of data point divs
   *
   * @returns an array of data point divs
   */
  const getDataPointList = () => {
    const dataPoints = getDataPoints(props.data);
    return dataPoints
      .filter(dataPoint => dataPoint !== undefined)
      .map((dataPoint, i) => {
        return (
          <div
            className={[
              props.isSelected(dataPoint.path) ? "datapoint--selected" : "",
              "datapoint"
            ].join(" ")}
            onClick={() => props.onDataPointClicked(dataPoint.path)}
            key={i}
          >
            {dataPoint.caption}
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
      <div className="content">{getDataPointList()}</div>
    </div>
  );
}
