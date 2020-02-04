import React, { useState, useEffect } from "react";
import "./App.css";
import Stomp from "stompjs";
import {faRuler, faExclamationTriangle, faStop} from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button.js";
import Header from "./components/Header.js";
import Scrollable from "./components/Scrollable.js";
import Tabs from "./components/Tabs.js";
import Gauge from "./components/Gauge";

export default function App() {
  const [connectedToPod, setConnectedToPod] = useState(false);
  const [stompClient, setStompClient] = useState(false);
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
        setStompClient(Stomp.client("ws://localhost:8080/connecthere"));

        stompClient.connect(
          {},
          frame => {
            stompClient.subscribe("/topic/podData", message =>
              podDataHandler(message)
            );
            stompClient.subscribe("/topic/isPodConnected", message =>
              podConnectionStatusHandler(message)
            );
            stompClient.subscribe("/topic/errors", message =>
              console.error(`ERROR FROM BACKEND: ${message}`)
            );
            stompClient.send("/app/pullData");
          },
          error => disconnectHandler(error)
        );
      })
      .catch(error => console.error(error));
  }, [stompClient]); // Only subscribe to stompClient changes

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
  useEffect(() => {
    let timer = setTimeout(() => {
      setGaugeData({
        velocity: Math.random() * 100,
        acceleration: Math.random() * 100
      });
      // setVelocity(Math.random() * 100);
      // setAcceleration(Math.random() * 100);
    }, refreshRate);
    return () => {
      clearTimeout(timer);
    };
  });

    return (
      <div className="gui-wrapper">
          <Header
            connectedToPod= {connectedToPod}
            connectedToBackend = {stompClient}
          />
          <div className="button-modular-container">
            <div className="buttons">             
                <Button
                      caption="CALIBRATE"
                      icon={faRuler}
                      onClick={() => {
                        return;
                      }}
                      slantedLeft
                      // slantedRight
                      textColor="#FFFFFF"
                      backgroundColor="#1098AD"
                  ></Button>
                <Button
                      caption="RETRACT BRAKES"
                      icon={faStop}
                      onClick={() => {
                        return;
                      }}
                      fontSize="1.5em"
                      // slantedRight
                      textColor="#000000"
                      backgroundColor="#FFFFFF"
                  ></Button>
                  <Button
                      caption="ABORT"
                      icon={faExclamationTriangle}
                      onClick={() => {
                        return;
                      }}
                      // slantedRight
                      textColor="#000000"
                      backgroundColor="#FFFFFF"
                  ></Button>             
            </div>
            <Scrollable></Scrollable>
          </div>
          <div className="gauge-container">
            <Gauge
              unit={"m/s"}
              radius={130}
              refreshRate={refreshRate}
              value={gaugeData.acceleration}
            />
            <Gauge
              unit={"m/s²"}
              radius={90}
              refreshRate={refreshRate}
              value={gaugeData.velocity}
            />
          </div>
          <Tabs></Tabs>
        </div>      

  );
}
