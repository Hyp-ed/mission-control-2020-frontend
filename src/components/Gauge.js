import React from "react";
import LiquidFillGauge from "react-liquid-gauge";

const black = "#000000";
const gray = "#8F8F8F";
const green = "#00A000";
const yellow = "#EAA200";
const red = "#F10026";

export default function Gauge(props) {
  const gradientStops = [
    {
      key: "0%",
      stopColor: green,
      stopOpacity: 1,
      offset: "0%"
    },
    {
      key: "60%",
      stopColor: yellow,
      stopOpacity: 0.75,
      offset: "75%"
    },
    {
      key: "80%",
      stopColor: red,
      stopOpacity: 0.5,
      offset: "100%"
    }
  ];

  return (
    <LiquidFillGauge
      innerRadius={0.9}
      width={props.radius * 2}
      height={props.radius * 2}
      value={props.value}
      unit={props.unit}
      textSize={1}
      textRenderer={props => {
        const value = Math.round(props.value);
        const radius = Math.min(props.height / 2, props.width / 2);
        const textPixels = (props.textSize * radius) / 2;
        const valueStyle = {
          fontSize: textPixels
        };
        const percentStyle = {
          fontSize: textPixels * 0.6
        };

        return (
          <tspan>
            <tspan className="value" style={valueStyle}>
              {value}
            </tspan>
            <tspan style={percentStyle}>{props.unit}</tspan>
          </tspan>
        );
      }}
      riseAnimation
      riseAnimationTime={props.refreshRate}
      waveAnimation={false}
      waveFrequency={2}
      waveAmplitude={0} // remove wave
      gradient
      gradientStops={gradientStops}
      circleStyle={{ fill: props.value > 80 ? red : gray }}
      textStyle={{
        fill: gray,
        fontFamily: "Roboto Mono"
      }}
      waveTextStyle={{
        fill: black,
        fontFamily: "Roboto Mono"
      }}
    />
  );
}
