import React, { useState } from "react";
import "./Tabs.css";
import LineGraph from "./LineGraph";
import DatapointContainer from "./DatapointContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDownload,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import ConfigManager from "../ConfigManager";

const NO_GRAPH = -1;

export default function Tabs(props) {
  // const [config, setConfig] = useState(require("../config.json"));
  const [currentGraph, setCurrentGraph] = useState(NO_GRAPH);

  /**
   * Recursively walk the data object using a list of keys.
   *
   * @param {object} data – object to be walked
   * @param {array} path – contains object keys
   * @returns data point object
   */
  const getDataPoint = (data, path) => {
    if (!data) {
      console.err("Data not initialized.");
      return undefined;
    }
    if (!path) {
      console.err("Path not initialized.");
      return undefined;
    }
    if (Array.isArray(data)) {
      let key = path[0];
      path = path.slice(1);
      data = data.find(o => o.name === key);
    } else if (data.hasOwnProperty("value") && Array.isArray(data.value)) {
      let key = path[0];
      path = path.slice(1);
      data = data.value.find(o => o.name === key);
    } else if (typeof data === "object" && data !== null) {
      if (path.length === 0) {
        return data;
      }
      let key = path[0];
      data = data[key];
      path = path.slice(1);
    } else {
      return undefined;
    }
    return getDataPoint(data, path);
  };

  const getDataPointValue = (data, path) => {
    return getDataPoint(data, path).value;
  };

  const getGraphs = () => {
    return Array.from(ConfigManager.getConfig().graphs, graph => (
      <LineGraph
        key={graph.ID}
        ID={graph.ID}
        paths={graph.paths ? graph.paths : []}
        fontSize={15}
        removeGraph={path => ConfigManager.removeGraph(path, currentGraph)}
        data={props.data}
        onSelectDatapointsClicked={setCurrentGraph}
        getValue={getDataPointValue}
      />
    ));
  };

  /**
   * Allow the user to upload a config file
   */
  const handleUploadClick = () => {
    try {
      document.getElementById("fileButton").click();
      document.getElementById("fileButton").onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onloadend = () => {
          ConfigManager.setConfig(reader.result);
        };
        event.target.value = null; // clear the input
      };
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Allow the user to download a config file
   */
  const handleDownloadClick = () => {
    try {
      const config = ConfigManager.getConfig();
      const str = JSON.stringify(config);
      const url = window.URL.createObjectURL(new Blob([str]));
      const link = document.createElement("a");
      link.download = "myGraphConfig.json";
      link.href = url;
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const resetCurrentGraph = () => {
    setCurrentGraph(NO_GRAPH);
  };

  const handleDataPointClicked = path => {
    ConfigManager.handlePath(path, currentGraph);
  };

  const isSelected = path => {
    return ConfigManager.isPathSelected(path, currentGraph);
  };

  // TODO: make graph container alone?
  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        <div className="graph-container">{getGraphs()}</div>
        <div className="graph-sidebar">
          <div
            className="graph-sidebar__icon"
            onClick={ConfigManager.addGraph}
            data-tip="Add graph" // tooltip caption
            enabled={ConfigManager.shouldEnableAdd}
          >
            <ReactTooltip
              effect="solid"
              delayShow={300}
              textColor="#8f8f8f"
              multiline={false}
            />
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div
            className="graph-sidebar__icon"
            onClick={handleDownloadClick}
            data-tip="Save config"
          >
            <ReactTooltip
              effect="solid"
              delayShow={300}
              textColor="#8f8f8f"
              multiline={false}
            />
            <FontAwesomeIcon icon={faDownload} />
          </div>
          <div
            onClick={handleUploadClick}
            className="graph-sidebar__icon"
            data-tip="Upload config"
          >
            <input id="fileButton" type="file" hidden></input>
            <ReactTooltip
              effect="solid"
              delayShow={300}
              textColor="#8f8f8f"
              multiline={false}
            />
            <FontAwesomeIcon icon={faUpload} />
          </div>
        </div>
      </div>
      <DatapointContainer
        visible={currentGraph !== NO_GRAPH}
        data={props.data.telemetryData}
        onCloseClicked={resetCurrentGraph}
        onDataPointClicked={handleDataPointClicked}
        isSelected={isSelected}
      ></DatapointContainer>
      <div className="bottom-buttons"></div>
    </div>
  );
}
