import React, { useState, useEffect, useMemo } from "react";
import "./Tabs.css";
import LineGraph from "./LineGraph";
import DatapointContainer from "./DatapointContainer";
import { isEqual } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDownload,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

/** The maximum number of graphs that can be displayed. */
const MAX_GRAPHS = 4;
/** TODO: */
const NO_GRAPH = -1;

export default function Tabs(props) {
  const [config, setConfig] = useState(require("./config.json"));
  const [currentGraph, setCurrentGraph] = useState(NO_GRAPH);

  // TODO: separate file?
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

  /**
   * Unique ID generator for graphs
   */
  const [graphID, setGraphID] = useState(config.graphs.length);
  const getGraphID = () => {
    let ID = graphID;
    setGraphID(ID + 1);
    return ID;
  };

  // TODO: ?
  /**
   * Memoize config, call fn iff config changes.
   */
  // useMemo(() => {
  //   fn(config);
  // }, [config]);

  const addGraph = () => {
    if (config.graphs.length >= MAX_GRAPHS) {
      console.error(`Maximum number of graphs (${MAX_GRAPHS}) reached!`);
      return;
    }
    config.graphs.push({
      ID: getGraphID(),
      paths: []
    });
  };

  const removeGraph = ID => {
    console.log(`Removing graph ${ID}`);
    config.graphs = config.graphs.filter(graph => graph.ID !== ID);
  };

  const getGraphs = () => {
    return Array.from(config.graphs, graph => (
      <LineGraph
        key={graph.ID}
        ID={graph.ID}
        paths={graph.paths ? graph.paths : []}
        fontSize={15}
        removeGraph={removeGraph}
        data={props.data}
        onSelectDatapointsClicked={ID => setCurrentGraph(ID)}
        getValue={(data, path) => getDataPoint(data, path).value}
      />
    ));
  };

  const addPath = path => {
    config.graphs.find(graph => graph.ID === currentGraph).paths.push(path);
  };

  const handlePath = path => {
    if (isPathSelected(path)) {
      removePath(path);
    } else {
      addPath(path);
    }
  };

  const removePath = path => {
    config.graphs.find(
      graph => graph.ID === currentGraph
    ).paths = config.graphs
      .find(graph => graph.ID === currentGraph)
      .paths.filter(p => !isEqual(p, path));
  };

  const isPathSelected = path => {
    try {
      return (
        config.graphs
          .find(graph => graph.ID === currentGraph)
          .paths.filter(p => isEqual(p, path)).length > 0
      );
    } catch (e) {
      return false;
    }
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
          setConfig(JSON.parse(reader.result));
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

  // TODO: make graph container alone?
  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        <div className="graph-container">{getGraphs()}</div>
        <div className="graph-sidebar">
          <div
            className="graph-sidebar__icon"
            onClick={addGraph}
            data-tip="Add graph" // tooltip caption
            enabled={config.graphs.length < MAX_GRAPHS}
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
        onCloseClicked={() => setCurrentGraph(NO_GRAPH)}
        onDataPointClicked={handlePath}
        isSelected={isPathSelected}
      ></DatapointContainer>
      <div className="bottom-buttons"></div>
    </div>
  );
}

// TODO: introduce ConfigManager  to wrap all functionality?
// TODO: GLOBAL - remove unused imports
