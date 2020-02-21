import React, { useState, useEffect } from "react";
import "./Main.css";
import ButtonContainer from "../components/ButtonContainer";
import Header from "../components/Header";
import DataContainer from "../components/DataContainer";
import Tabs from "../components/Tabs";
import GaugeContainer from "../components/GaugeContainer";

export default function Main(props) {
  const connectedToPod = props.connectedToPod;
  const stompClient = props.stompClient;
  const podData = props.podData;

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
      <GaugeContainer></GaugeContainer>
      <Tabs activeTabs />
    </div>
  );
}
