import React, { useState } from "react";
import "./Tabs.css";
import LineChart from "./LineChart";
import DatapointContainer from "./DatapointContainer";

const MAX_CHARTS = 4;

export default function Tabs(props) {
  var config = require("./config.json");
  const [currentlySelecting, setCurrentlySelecting] = useState(null);
  const [chartDatapoints, setChartDatapoints] = useState({});

  // TEMP
  const telemetryData = require("../testData.json");

  const removeChart = id => {
    config.charts = config.charts.filter(chart => chart.id !== id);
  };

  const getCharts = () => {
    return Array.from(config.charts, chart => (
      <LineChart
        key={chart.id}
        id={chart.id}
        keyArrays={chart.datapoints}
        fontSize={12}
        removeChart={removeChart}
        selectDatapoints={selectDatapoints}
        data={props.data}
      />
    ));
  };

  const addChart = () => {
    if (config.charts.length >= MAX_CHARTS) {
      console.error(`Maximum number of charts (${MAX_CHARTS}) reached!`);
      return;
    }
    config.charts.push({ id: config.charts.length, datapoints: [] });
  };

  const selectDatapoints = chartId => {
    setCurrentlySelecting(chartId);
  };

  const addDatapoint = datapoint => {
    const datapoints = chartDatapoints.hasOwnProperty(currentlySelecting)
      ? [...chartDatapoints[currentlySelecting], datapoint]
      : [datapoint];
    setChartDatapoints({
      ...chartDatapoints,
      [currentlySelecting]: datapoints
    });
  };

  const getDatapointIndex = (list, datapoint) => {
    return list.findIndex(d => {
      const treesEqual =
        d.tree && datapoint.tree
          ? d.tree.length === datapoint.tree.length &&
            d.tree.every((d, i) => d === datapoint.tree[i])
          : true;
      const namesEqual = d.name === datapoint.name;
      return namesEqual && treesEqual;
    });
  };

  const handleDatapoint = datapoint => {
    if (
      // TODO refactor: contains datapoint
      chartDatapoints.hasOwnProperty(currentlySelecting) &&
      getDatapointIndex(chartDatapoints[currentlySelecting], datapoint) > -1
    ) {
      removeDatapoint(datapoint);
    } else {
      addDatapoint(datapoint);
    }
  };

  const removeDatapoint = datapoint => {
    const index = getDatapointIndex(
      chartDatapoints[currentlySelecting],
      datapoint
    );
    if (index > -1) {
      setChartDatapoints(previous => {
        previous[currentlySelecting].splice(index, 1);
        return previous;
      });
    }
  };

  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>

      <div className="window-container">
        <div className="graph-container">{getCharts()}</div>
        <div className="plus" onClick={() => addChart()}></div>
      </div>
      <DatapointContainer
        visible={currentlySelecting !== null}
        data={telemetryData}
        onCloseClicked={() => {
          setCurrentlySelecting(null);
        }}
        getDatapointIndex={getDatapointIndex}
        selectedDatapoints={chartDatapoints[currentlySelecting]}
        handleDatapoint={handleDatapoint}
      />
    </div>
  );
}
