import React from "react";
import "./AddGraphButton.css";

export default function AddGraphButton(props) {
  return (
    <div
      className={["plus", props.enabled ? "clickable" : ""].join(" ")}
      onClick={() => props.onClick()}
    />
  );
}
