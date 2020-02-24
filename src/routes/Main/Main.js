import React, { useState, useEffect } from "react";
import "./Main.css";
import ButtonContainer from "../../components/ButtonContainer/ButtonContainer";
import Header from "../../components/Header/Header";
import DataContainer from "../../components/DataContainer/DataContainer";
import Tabs from "../../components/Tabs/Tabs";
import GaugeContainer from "../../components/GaugeContainer/GaugeContainer";

export default function Main(props) {
  return (
    <div className="gui-wrapper">
      <Header
        telemetryConnection={props.telemetryConnection}
      />
      <ButtonContainer
        stompClient={props.stompClient}
        telemetryData={props.telemetryData}
      ></ButtonContainer>
      <DataContainer telemetryData={props.telemetryData}></DataContainer>
      <GaugeContainer></GaugeContainer>
      <Tabs terminalOutput={props.terminalOutput}/>
    </div>
  );
}
