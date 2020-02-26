import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../hyped.png";
import PositionBar from "../PositionBar/PositionBar";

export default function Header(props) {
  const [timerState, setTimerState] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const telemetryConnectionStyle = props.telemetryConnection
    ? "pod-connection connected"
    : "pod-connection disconnected";

  const startTimer = () => {
    setStartTime(props.startTime);
    setTimerState(true);
  };

  const stopTimer = () => {
    setTimerState(false);
    setTime(0);
  };

  useEffect(() => {
    // once we get a start time from the pod, start the timer
    if (props.startTime != 0) {
      startTimer();
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerState === true) setTime(Date.now() - startTime);
    }, 1); // runs every milisecond
    return () => clearInterval(interval);
  }, [timerState]); //sets interval once when timer state changes

  const formatTime = duration => {
    var milliseconds = parseInt(duration % 1000),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (milliseconds < 10) {
      milliseconds = "00" + milliseconds;
    } else if (milliseconds < 100) {
      milliseconds = "0" + milliseconds;
    }

    return "T+ " + minutes + ":" + seconds + "." + milliseconds;
  };

  return (
    <header className="header-root">
      <img src={logo} className="hyped-logo" alt="logo" />
      <PositionBar distance={props.distance} />
      <p className="timer">{formatTime(time)}</p>
      <div className="pod-status">
        <div className={telemetryConnectionStyle}>
          {props.telemetryConnection ? "CONNECTED" : "DISCONNECTED"}
        </div>
        <div className="pod-state">{props.state}</div>
        <div className="backend-connection">
          {props.baseStationConnection ? "" : "NOT CONNECTED TO BACKEND"}
        </div>
      </div>
    </header>
  );
}
