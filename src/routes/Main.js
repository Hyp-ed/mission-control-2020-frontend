import React, { useState, useEffect } from "react";
import "./Main.css";
import ButtonContainer from "../components/ButtonContainer";
import Header from "../components/Header";
import DataContainer from "../components/DataContainer";
import Tabs from "../components/Tabs";
import Gauge from "../components/Gauge";

export default function Main(props) {
  const connectedToPod = props.connectedToPod;
  const stompClient = props.stompClient;
  const podData = props.podData;
  // TEMP: FAKE GAUGE DATA
  // We use an object to force both gauges update at the same time
  // If acceleration and velocity were two separate hooks, changing the state of one of them would only force the corresponding gauge to re-render
  // This is actually the more efficient way to do it, but it made the animation behave weirdly
  const [gaugeData, setGaugeData] = useState({ velocity: 0, acceleration: 0 });
  const refreshRate = 250;
  const accMaxValue = 50;
  const velMaxValue = 400;
  useEffect(() => {
    let timer = setTimeout(() => {
      setGaugeData({
        velocity: Math.random() * velMaxValue,
        acceleration: Math.random() * accMaxValue
      });
    }, refreshRate);
    return () => {
      clearTimeout(timer);
    };
  }, [gaugeData]);

  return (
    <div className="gui-wrapper">
      <Header
        connectedToPod={connectedToPod}
        connectedToBackend={stompClient}
      />
      <ButtonContainer
        stompClient={stompClient}
        podData={podData}
      ></ButtonContainer>
      <DataContainer podData={podData}></DataContainer>
      <div className="gauge-container">
        <Gauge
          unit={"m/s"}
          size={Math.min(window.innerHeight / 4, window.innerWidth / 7)}
          refreshRate={refreshRate}
          value={gaugeData.velocity}
          maxValue={velMaxValue}
        />
        <Gauge
          unit={"m/s²"}
          size={Math.min(window.innerHeight / 6, window.innerWidth / 11)}
          refreshRate={refreshRate}
          value={gaugeData.acceleration}
          maxValue={accMaxValue}
        />
      </div>
      <Tabs activeTabs />
    </div>
  );
}
