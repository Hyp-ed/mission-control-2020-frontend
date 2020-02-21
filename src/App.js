import React, { useState, useEffect } from "react";
import { MemoryRouter, Switch, Route, Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import Stomp from "stompjs";
import Home from "./routes/Home";
import Main from "./routes/Main";
import Disconnected from "./routes/Disconnected";
import Loading from "./routes/Loading";
import Setup from "./routes/Setup";
import testData from "./testData.json";

export default function App() {
  const [stompClient, setStompClient] = useState(null);
  const [telemetryConnection, setTelemetryConnection] = useState(false);
  const [telemetryData, setTelemetryData] = useState(testData);

  useEffect(() => {
    const sc = Stomp.client("ws://localhost:8080/connecthere");
    sc.debug = false;
    setStompClient(sc);
    sc.connect(
      {},
      frame => {
        sc.subscribe("/topic/telemetry/data", message =>
          telemetryDataHandler(message)
        );
        sc.subscribe("/topic/telemetry/connection", message =>
          telemetryConnectionHandler(message)
        );
        sc.subscribe("/topic/errors", message =>
          console.error(`ERROR FROM BACKEND: ${message}`)
        );
      },
      error => disconnectHandler(error)
    );
  }, []); // Only run once

  const telemetryConnectionHandler = message => {
    setTelemetryConnection(message.body === "CONNECTED" ? true : false);
  };

  const telemetryDataHandler = message => {
    setTelemetryData(JSON.parse(message.body));
  };

  const disconnectHandler = error => {
    if (error.startsWith("Whoops! Lost connection")) {
      setTelemetryConnection(false);
      console.error("DISCONNECTED FROM BACKEND");
    } else {
      console.error(error);
    }
  };

  const history = createMemoryHistory();
  return (
    <MemoryRouter history={history}>
      <Link to="/main">as</Link>
      <Switch>
        <Route
          path="/main"
          render={props => (
            <Main
              telemetryConnection={telemetryConnection}
              stompClient={stompClient}
              telemetryData={telemetryData}
            />
          )}
        ></Route>
        <Route path="/loading" render={props => <Loading />}></Route>
        <Route path="/disconnected" render={props => <Disconnected />}></Route>
        <Route path="/setup" render={props => <Setup />}></Route>
        <Route path="/" render={props => <Home />}></Route>
      </Switch>
    </MemoryRouter>
  );
}
