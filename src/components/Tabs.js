import React from "react";
import "./Tabs.css";
import LineChart from "./LineChart";

export default function Tabs(props) {
  return (
    <div className="tabs-root">
      <div className="tabs-container"></div>
      <div className="window-container">
        {/* <LineChart
          datasets={[
            { label: "IMU", data: IMUData, unit: "m/s²" },
            { label: "Speed", data: speedData, unit: "m/s" }
          ]}
          fontSize={12}
        /> */}
        <LineChart
          datasets={props.graphs[0].datasets}
          fontSize={props.graphs[0].fontSize}
        ></LineChart>
      </div>
    </div>
  );
}
