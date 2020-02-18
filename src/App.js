import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stomp from "stompjs";
import Home from "./routes/Home";
import Main from "./routes/Main";
import Disconnected from "./routes/Disconnected";
import Loading from "./routes/Loading";
import Setup from "./routes/Setup";
import testData from "./testData.json";

export default function App() {
  const [connectedToPod, setConnectedToPod] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [podData, setPodData] = useState(testData);

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
        sc.debug = false;
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
    <Router>
      <Switch>
        <Route
          path="/main"
          render={props => (
            <Main
              connectedToPod={connectedToPod}
              stompClient={stompClient}
              podData={podData}
            />
          )}
        ></Route>
        <Route path="/loading" render={props => <Loading />}></Route>
        <Route path="/disconnected" render={props => <Disconnected />}></Route>
        <Route path="/setup" render={props => <Setup />}></Route>
        <Route path="/" render={props => <Home />}></Route>
      </Switch>
    </Router>
  );
}
