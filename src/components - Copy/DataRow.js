import React from "react";
import "./DataRow.css";

export default props => {
  const range = (props.data.max - props.data.min) / 0.8;
  const realMin = props.data.min - range * 0.1;
  const realMax = props.data.max + range * 0.1;
  const value = Math.max(Math.min(props.data.value, realMax), realMin);
  const percentage = (value - realMin) / range * 100;
  
  return (
    <div className={"data-row level-" + props.level}>
      <div className="data-row-name">{props.data.name}</div>
      <div className={"data-row-bar" + (percentage > 90 || percentage < 10 ? " alert" : "")}>
        <div
          className="progress-bar"
          style={{
            width: percentage + "%",
            marginRight: -percentage + "%"
          }}
        ></div>
        <div className="range">
          <div className="range-border range-border-bottom"></div>
          <div className="range-border range-border-top"></div>
          <div className="range-value range-min">{props.data.min}</div>
          <div className="range-value range-max">{props.data.max}</div>
        </div>
      </div>
        <div className="data-row-value">{props.data.value + " " + props.data.unit}</div>
    </div>
  );
};
