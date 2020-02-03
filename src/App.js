import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Stomp from "stompjs";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button.js";
import Header from "./components/Header.js";
import Scrollable from "./components/Scrollable.js";
import Tabs from "./components/Tabs.js";

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
  });

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


    return (
      
      <div className="background">
        <div className="gui-wrapper">
          <Header
            connectedToPod= {this.state.connectedToPod}
            connectedToBackend = {this.state.stompClient}
          />
          <div className="modular-container">
            <div className="main-buttons">
                <Button
                  caption="CALIBRATE"
                  icon={faRuler}
                  onClick={() => {
                    return;
                  }}
                  width="8em"
                  slantedLeft
                  // slantedRight
                  textColor="#FFFFFF"
                  backgroundColor="#1098AD"
              ></Button>
            </div>
            <Scrollable>

            </Scrollable>
          </div>
          <Tabs>

          </Tabs>
        </div>
      </div>      

  );
}
