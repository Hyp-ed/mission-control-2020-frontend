import React, { useState } from "react";
import "./Tabs.css";
import LineGraph from "./LineGraph";
import DataPointSelector from "./DataPointSelector";
import ConfigManager from "../ConfigManager";
import Graphs from "./Graphs";
import Sidebar from "./Sidebar";

const NO_GRAPH = -1;
export default function Tabs(props) {
  const [currentGraph, setCurrentGraph] = useState(NO_GRAPH);

  const getGraphs = () => {
    return Array.from(ConfigManager.getConfig().graphs, graph => (
      <LineGraph
        key={graph.ID}
        ID={graph.ID}
        paths={graph.paths ? graph.paths : []}
        removeGraph={path => ConfigManager.removeGraph(path, currentGraph)}
        data={props.data}
        onSelectClicked={setCurrentGraph}
      />
    ));
  };

  const handleUploadClick = () => {
    document.getElementById("fileButton").click();
    document.getElementById("fileButton").onchange = event => {
      const file = event.target.files[0];
      ConfigManager.parseConfig(file);
      event.target.value = null; // clear the input
    };
  };

  const handleSaveClick = () => {
    try {
      const str = ConfigManager.getConfigString();
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

  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        <Graphs graphs={getGraphs()} />
        <Sidebar
          handleAddGraphClick={ConfigManager.addGraph}
          isAddEnabled={ConfigManager.shouldEnableAdd()}
          handleSaveClick={handleSaveClick}
          handleUploadClick={handleUploadClick}
        ></Sidebar>
      </div>
      <DataPointSelector
        visible={currentGraph !== NO_GRAPH}
        data={props.data.telemetryData}
        onCloseClicked={resetCurrentGraph}
        onDataPointClicked={handleDataPointClicked}
        isSelected={isSelected}
      ></DataPointSelector>
    </div>
  );
}
