import React from "react";
import "./Indicator.css";

export default function Indicator(props) {
  const indicatorStyle = props.enabled
    ? "indicator indicator-enabled"
    : "indicator indicator-disabled";

  return (
    <div className={indicatorStyle}>
      <div className="caption">{props.caption}</div>
    </div>
  );
}
