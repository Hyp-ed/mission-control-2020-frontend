import React from "react";
import LiquidFillGauge from "react-liquid-gauge";

const black = "#000000";
const gray = "#8F8F8F";
const green = "#00A000";
const yellow = "#EAA200";
const red = "#F10026";

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

export default function Gauge(props) {
  // Create a percentage function that maps values to percentages
  // The value at which the fill is 0%
  const zeroFillValue = props.zeroFillValue ? props.zeroFillValue : 0;
  // Percentage to which maxValue is mapped
  const maxValuePct = props.maxValuePct ? props.maxValuePct : 90;
  // Calculate gradient
  const deltaY = maxValuePct - 0;
  const deltaX = props.maxValue - zeroFillValue;
  const gradient = deltaY / deltaX;
  // Calculate y-axis intercept based on known x-axis intercept (zeroFillValue)
  const b = -gradient * zeroFillValue;
  const pctValue = gradient * props.value + b;

  // Specifies a custom text renderer for rendering a percent value.
  const textRenderer = () => {
    const fontSize = props.size / 4;
    return (
      <tspan>
        <tspan className="value" style={{ fontSize }}>
          {Math.round(props.value)}
        </tspan>
        <tspan style={{ fontSize: fontSize * 0.6 }}>{props.unit}</tspan>
      </tspan>
    );
  };

  return (
    <LiquidFillGauge
      innerRadius={0.9}
      width={props.size}
      height={props.size}
      value={pctValue} // value must be in percent as per documentation
      textRenderer={textRenderer}
      riseAnimation
      riseAnimationTime={props.refreshRate}
      waveAnimation={false}
      waveFrequency={2}
      waveAmplitude={0} // remove wave
      gradient
      gradientStops={gradientStops}
      circleStyle={{
        fill:
          props.value < props.minValue || props.maxValue < props.value
            ? red
            : gray
      }}
      textStyle={{
        fill: gray
      }}
      waveTextStyle={{
        fill: black
      }}
    />
  );
}
