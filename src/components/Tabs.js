import React, { useState, useEffect, useMemo } from "react";
import "./Tabs.css";
import LineGraph from "./LineGraph";
import DatapointContainer from "./DatapointContainer";
import { isEqual } from "lodash";
import AddGraphButton from "./AddGraphButton";

const MAX_GRAPHS = 4;

export default function Tabs(props) {
  var config = require("./config.json");
  const [currentGraph, setCurrentGraph] = useState(null);
  const [graphDatapoints, setGraphDatapoints] = useState({});

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

  const parseConfig = () => {
    let datapoints = {};
    config.graphs.forEach(graph => {
      datapoints[graph.id] = graph.paths.map(path => {
        let datapoint = getDatapoint(props.data.telemetryData, path);
        return {
          name: datapoint.name,
          unit: datapoint.unit,
          min: datapoint.min,
          max: datapoint.max,
          path: path
        };
      });
    });
    setGraphDatapoints(datapoints);
  };

  /**
   * Memoize config, parsing happens only if config changes.
   */
  useMemo(() => {
    parseConfig(config);
  }, [config]);

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
    console.log("removing " + id);
    config.graphs = config.graphs.filter(graph => graph.id !== id);
    console.log(config);
  };

  const getGraphs = () => {
    return Array.from(config.graphs, graph => (
      <LineGraph
        key={graph.id}
        id={graph.id}
        datapoints={graphDatapoints[graph.id] ? graphDatapoints[graph.id] : []}
        fontSize={10}
        removeGraph={removeGraph}
        data={props.data}
        onSelectDatapointsClicked={id => setCurrentGraph(id)}
        getValue={(data, path) => getDatapoint(data, path).value}
      />
    ));
  };

  const addDatapoint = datapoint => {
    const datapoints = graphDatapoints.hasOwnProperty(currentGraph)
      ? [...graphDatapoints[currentGraph], datapoint]
      : [datapoint];
    setGraphDatapoints({
      ...graphDatapoints,
      [currentGraph]: datapoints
    });
  };

  const getDatapointIndex = (list, datapoint) => {
    if (!list || !datapoint) {
      return -1;
    }
    return list.findIndex(d => {
      // Perform deep comparison
      return isEqual(d, datapoint);
    });
  };

  const handleDatapoint = datapoint => {
    if (
      graphDatapoints.hasOwnProperty(currentGraph) &&
      getDatapointIndex(graphDatapoints[currentGraph], datapoint) > -1
    ) {
      removeDatapoint(datapoint);
    } else {
      addDatapoint(datapoint);
    }
  };

  const removeDatapoint = datapoint => {
    const index = getDatapointIndex(graphDatapoints[currentGraph], datapoint);
    if (index > -1) {
      setGraphDatapoints(previous => {
        previous[currentGraph].splice(index, 1);
        return previous;
      });
    }
  };

  const isDatapointSelected = datapoint => {
    return getDatapointIndex(graphDatapoints[currentGraph], datapoint) > -1;
  };

  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        <div className="graph-container">{getGraphs()}</div>
        <AddGraphButton
          enabled={config.graphs.length < MAX_GRAPHS}
          onClick={() => addGraph()}
        />
      </div>
      <DatapointContainer
        visible={currentGraph !== null}
        data={props.data.telemetryData}
        onCloseClicked={() => setCurrentGraph(null)}
        getDatapointIndex={getDatapointIndex}
        graphDatapoints={graphDatapoints[currentGraph]}
        handleDatapoint={handleDatapoint}
        isSelected={isDatapointSelected}
      />
    </div>
  );
}
