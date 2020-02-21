import React, { useState, useEffect } from "react";
import "./Main.css";
import ButtonContainer from "../components/ButtonContainer";
import Header from "../components/Header";
import DataContainer from "../components/DataContainer";
import Tabs from "../components/Tabs";
import GaugeContainer from "../components/GaugeContainer";

export default function Main(props) {
  const telemetryConnection = props.telemetryConnection;
  const stompClient = props.stompClient;
  const telemetryData = props.telemetryData;

  return (
    <div className="gui-wrapper">
      <Header
        telemetryConnection={telemetryConnection}
        connectedToBackend={stompClient}
      />
      <ButtonContainer
        stompClient={stompClient}
        telemetryData={telemetryData}
      ></ButtonContainer>
      <DataContainer telemetryData={telemetryData}></DataContainer>
      <GaugeContainer></GaugeContainer>
      <Tabs activeTabs />
    </div>
  );
}
