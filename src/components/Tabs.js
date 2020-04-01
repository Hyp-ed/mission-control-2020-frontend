import React, { useState } from "react";
import "./Tabs.css";
import LineGraph from "./LineGraph";
import DatapointContainer from "./DatapointContainer";
import ConfigManager from "../ConfigManager";
import Sidebar from "./Sidebar";

const NO_GRAPH = -1;
const GraphContainer = props => {
  return <div className="graph-container">{props.graphs}</div>;
};

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
      console.error("Data not initialized.");
      return undefined;
    }
    if (!path) {
      console.error("Path not initialized.");
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
    document.getElementById("fileButton").click();
    document.getElementById("fileButton").onchange = event => {
      const file = event.target.files[0];
      ConfigManager.parseConfig(file);
      event.target.value = null; // clear the input
    };
  };

  /**
   * Allow the user to download a config file
   */
  const handleSaveClick = () => {
    try {
      const str = ConfigManager.downloadableString();
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

  // TODO: move current graph id to config manager?
  const resetCurrentGraph = () => {
    setCurrentGraph(NO_GRAPH);
  };

  const handleDataPointClicked = path => {
    ConfigManager.handlePath(path, currentGraph);
  };

  const isSelected = path => {
    return ConfigManager.isPathSelected(path, currentGraph);
  };

  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        <GraphContainer graphs={getGraphs()}></GraphContainer>
        <Sidebar
          handleAddGraphClick={ConfigManager.addGraph}
          handleSaveClick={handleSaveClick}
          handleUploadClick={handleUploadClick}
        ></Sidebar>
      </div>
      <DatapointContainer
        visible={currentGraph !== NO_GRAPH}
        data={props.data.telemetryData}
        onCloseClicked={resetCurrentGraph}
        onDataPointClicked={handleDataPointClicked}
        isSelected={isSelected}
      ></DatapointContainer>
    </div>
  );
}
