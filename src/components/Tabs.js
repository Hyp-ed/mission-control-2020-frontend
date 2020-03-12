import React, { useState, useEffect, useMemo } from "react";
import "./Tabs.css";
import LineGraph from "./LineGraph";
import DatapointContainer from "./DatapointContainer";
import { isEqual } from "lodash";
import AddGraphButton from "./AddGraphButton";

const MAX_GRAPHS = 4;
const NO_GRAPH = -1;

export default function Tabs(props) {
  var config = require("./config.json");
  const [currentGraph, setCurrentGraph] = useState(-1);

  /**
   * Recursively walks the data object using a list of keys and returns the datapoint object under the given path
   *
   * @param {object} data – object to be walked
   * @param {array} path – contains object keys
   * @returns
   */
  const getDatapoint = (data, path) => {
    if (!data || !path) {
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
    return getDatapoint(data, path);
  };

  /**
   * Simple incremental unique id generator for graphs
   */
  const [graphId, setGraphId] = useState(config.graphs.length);
  const getGraphId = () => {
    let id = graphId;
    setGraphId(id + 1);
    return id;
  };

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
      id: getGraphId(),
      paths: []
    });
  };

  const removeGraph = id => {
    console.log(`Removing graph ${id}`);
    config.graphs = config.graphs.filter(graph => graph.id !== id);
  };

  const getGraphs = () => {
    return Array.from(config.graphs, graph => (
      <LineGraph
        key={graph.id}
        id={graph.id}
        paths={graph.paths ? graph.paths : []}
        fontSize={10}
        removeGraph={removeGraph}
        data={props.data}
        onSelectDatapointsClicked={id => setCurrentGraph(id)}
        getValue={(data, path) => getDatapoint(data, path).value}
      />
    ));
  };

  const addPath = path => {
    config.graphs.find(graph => graph.id === currentGraph).paths.push(path);
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
      graph => graph.id === currentGraph
    ).paths = config.graphs
      .find(graph => graph.id === currentGraph)
      .paths.filter(p => !isEqual(p, path));
  };

  const isPathSelected = path => {
    try {
      return (
        config.graphs
          .find(graph => graph.id === currentGraph)
          .paths.filter(p => isEqual(p, path)).length > 0
      );
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        <div className="graph-container">{getGraphs()}</div>
        <AddGraphButton
          enabled={config.graphs.length < MAX_GRAPHS}
          onClick={addGraph}
        />
      </div>
      <DatapointContainer
        visible={currentGraph !== NO_GRAPH}
        data={props.data.telemetryData}
        onCloseClicked={() => setCurrentGraph(NO_GRAPH)}
        handlePath={handlePath}
        isSelected={isPathSelected}
      />
    </div>
  );
}
