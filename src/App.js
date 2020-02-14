import React, { useState, useEffect } from "react";
import "./App.css";
import Stomp from "stompjs";
import ButtonContainer from "./components/ButtonContainer";
import Header from "./components/Header.js";
import DataContainer from "./components/DataContainer";
import Tabs from "./components/Tabs.js";
import Gauge from "./components/Gauge";

export default function App() {
  const [connectedToPod, setConnectedToPod] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [podData, setPodData] = useState(null);

  useEffect(() => {
    // ask backend to start base-station server instance
    // afterwards establish websocket connection to backend
    fetch("http://localhost:8080/server", { method: "POST" })
      .then(
        response => response.text(),
        error =>
          Promise.reject(
            "Error: could not communicate with backend (fetch() returned error)"
          )
      )
      .then(text => console.log("CONNECTED TO BACKEND"))
      .then(() => {
        const sc = Stomp.client("ws://localhost:8080/connecthere");
        setStompClient(sc);
        sc.connect(
          {},
          frame => {
            sc.subscribe("/topic/podData", message => podDataHandler(message));
            sc.subscribe("/topic/isPodConnected", message =>
              podConnectionStatusHandler(message)
            );
            sc.subscribe("/topic/errors", message =>
              console.error(`ERROR FROM BACKEND: ${message}`)
            );
            sc.send("/app/pullData");
          },
          error => disconnectHandler(error)
        );
      })
      .catch(error => console.error(error));
  }, []); // Only run once

  const podConnectionStatusHandler = message => {
    const receivedPodConnectionStatus = message.body;

    setConnectedToPod(
      receivedPodConnectionStatus === "CONNECTED" ? true : false
    );
    console.log(receivedPodConnectionStatus);
  };

  const podDataHandler = message => {
    const receivedPodData = JSON.parse(message.body);
    setPodData(receivedPodData);
  };

  const disconnectHandler = error => {
    if (error.startsWith("Whoops! Lost connection")) {
      setConnectedToPod(false);
      console.error("DISCONNECTED FROM BACKEND");
    } else {
      console.error(error);
    }
  };

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
      <ButtonContainer></ButtonContainer>
      <DataContainer></DataContainer>
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
      <Tabs
        activeTabs
      />
    </div>
  );
}
