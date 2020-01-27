import React from "react";
import "./App.css";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button.js";

function App() {
  return (
    <div>
      <Button
        caption="CALIBRATE"
        icon={faRuler}
        onClick={() => {
          return;
        }}
        width="25%"
        slantedLeft
        // slantedRight
        textColor="#FFFFFF"
        backgroundColor="#1098AD"
      ></Button>
    </div>
  );
}

export default App;
