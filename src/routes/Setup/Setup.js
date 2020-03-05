import React, { useState, useEffect } from "react";
import "./Setup.css";
import SetupLogo from "../SetupLogo/SetupLogo";
import Button from "../../components/Button/Button";
import { useHistory } from "react-router-dom";
import {
  faPlay,
  faCogs,
  faWifi,
  faSpinner,
  faCheck,
  faRedo
} from "@fortawesome/free-solid-svg-icons";

export default function Setup(props) {
  const history = useHistory();
  const [ipAddress, setIpAddress] = useState("localhost");
  const [flags, setFlags] = useState([]);

  const fakeSystems = [
    { name: "IMU", value: "--fake_imu" },
    { name: "IMU FAIL", value: "--fake_imu_fail" },
    { name: "Batteries", value: "--fake_batteries" },
    { name: "Batteries FAIL", value: "--fake_batteries_fail" },
    { name: "Keyence", value: "--fake_keyence" },
    { name: "Keyence FAIL", value: "--fake_keyence_fail" },
    { name: "Temperature", value: "--fake_temperature" },
    { name: "Temperature FAIL", value: "--fake_temperature_fail" },
    { name: "Embrakes", value: "--fake_embrakes" },
    { name: "Motors", value: "--fake_motors" },
    { name: "Battery test", value: "--battery_test" },
    { name: "High power", value: "--fake_highpower" }
  ];

  const additional = [];

  const connectButtons = {
    connect: {
      caption: "CONNECT",
      backgroundColor: "bg-white-gradient",
      icon: faWifi
    },
    connecting: {
      caption: "CONNECTING",
      backgroundColor: "bg-white-gradient",
      icon: faSpinner,
      disabled: true,
      spin: true
    },
    connected: {
      caption: "CONNECTED",
      backgroundColor: "bg-green-gradient",
      icon: faCheck,
      disabled: true
    },
    failed: {
      caption: "RETRY",
      backgroundColor: "bg-red-gradient",
      icon: faRedo
    }
  };

  const getChoiceList = choices => {
    return choices.map(choice => (
      <div className="input-group-switch">
        <input
          type="checkbox"
          class="switch"
          value={choice.value}
          onChange={handleFlagChange}
        ></input>
        <label>{choice.name}</label>
      </div>
    ));
  };

  const getConnectButton = () => {
    var button;
    if (props.debugConnection) {
      button = connectButtons.connected;
    } else {
      switch (props.debugStatus) {
        case "DISCONNECTED":
          button = connectButtons.connect;
          break;
        case "CONNECTING":
          button = connectButtons.connecting;
          break;
        case "CONNECTING_FAILED":
          button = connectButtons.failed;
          break;
        default:
          button = connectButtons.failed;
          break;
      }
    }

    return (
      <Button
        caption={button.caption}
        handleClick={handleConnectClick}
        backgroundColor={button.backgroundColor}
        icon={button.icon}
        spin={button.spin}
        disabled={button.disabled || ipAddress == ""}
      ></Button>
    );
  };

  const handleConnectClick = () => {
    if (
      (props.debugStatus != "DISCONNECTED" &&
        props.debugStatus != "CONNECTING_FAILED") ||
      ipAddress == ""
    ) {
      return;
    }
    props.stompClient.send("/app/send/debug/connect", {}, ipAddress);
    console.log("Sent connection command to debug server");
  };

  const handleRunClick = () => {
    if (!props.debugConnection) {
      return;
    }
    props.stompClient.send("/app/send/debug/run", {}, JSON.stringify(flags));
    history.push("/main");
  };

  const handleCompileClick = () => {
    if (!props.debugConnection) {
      return;
    }
    props.stompClient.send(
      "/app/send/debug/compileRun",
      {},
      JSON.stringify(flags)
    );
    history.push("/loading");
  };

  const handleIpAddressChange = e => {
    setIpAddress(e.target.value);
  };

  const handleFlagChange = e => {
    var newFlags = flags;
    if (e.target.checked) {
      newFlags.push(e.target.value);
    } else {
      newFlags.splice(newFlags.indexOf(e.target.value), 1);
    }
    setFlags(newFlags);
  };

  // TODO: fittext
  return (
    <div className="setup-wrapper centered">
      <SetupLogo></SetupLogo>
      <div className="input-group">
        <label>IP address</label>
        <div className="input-group-button">
          <input
            onChange={handleIpAddressChange}
            defaultValue={"localhost"}
          ></input>
          {getConnectButton()}
        </div>
      </div>
      <div className="input-group">
        <label>Fake systems</label>
        <div className="input-group-multiple">{getChoiceList(fakeSystems)}</div>
      </div>
      <div className="input-group">
        <label>Additional values</label>
        <div className="input-group-multiple">{getChoiceList(additional)}</div>
      </div>
      <div className="setup-wrapper-buttons">
        <Button
          caption="RUN"
          handleClick={handleRunClick}
          backgroundColor="bg-white-gradient"
          icon={faPlay}
          disabled={!props.debugConnection}
        ></Button>
        <Button
          caption="COMPILE & RUN"
          handleClick={handleCompileClick}
          backgroundColor="bg-white-gradient"
          icon={faCogs}
          disabled={!props.debugConnection}
        ></Button>
      </div>
    </div>
  );
}
