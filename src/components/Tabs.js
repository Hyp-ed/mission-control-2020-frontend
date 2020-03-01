import React, { useState } from "react";
import "./Tabs.css";
import LineChart from "./LineChart";

const MAX_CHARTS = 4;

export default function Tabs(props) {
  const [selectingDatapoints, setSelectingDataPoints] = useState(false);
  var config = require("./config.json");

  const removeChart = id => {
    config.charts = config.charts.filter(chart => chart.id !== id);
  };

  const getLineCharts = () => {
    return Array.from(config.charts, chart => (
      <LineChart
        key={chart.id}
        id={chart.id}
        datapoints={props.graphs[0].datasets}
        fontSize={props.graphs[0].fontSize}
        removeChart={removeChart}
        selectDatapoints={selectDatapoints}
      />
    ));
  };

  const addLineChart = () => {
    if (config.charts.length >= MAX_CHARTS) {
      console.log(`Maximum number of charts (${MAX_CHARTS}) reached!`);
      return;
    }
    var id = config.charts.length;
    config.charts.push({ id, datapoints: [] });
  };

  const selectDatapoints = chartId => {
    setSelectingDataPoints(!selectingDatapoints);
    // selectingDatapoints = true;
    console.log("selecting");
  };

  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>

      <div className="window-container">
        <div className="graph-container">{getLineCharts()}</div>
        <div className="plus" onClick={() => addLineChart()}></div>
      </div>
      {/* <div className={selectingDatapoints ? "datapoint-container" : ""}></div> */}
    </div>
  );
}
