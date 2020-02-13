import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

const colors = [
  "#BF000B", // dark red
  "#009AB0", // blue
  "#FF9B00", // yellow
  "#FFFFFF" // white
];

const accentColor = "#8F8F8F";
const options = fontSize => {
  return {
    maintainAspectRatio: true,
    // onResize: (_, size) => {},
    animation: {
      duration: 0 // ensures that the lines scale with y-axis on y-axis resize without delay
    },
    elements: {
      point: {
        radius: 0
      }
    },
    style: {
      strokeWidth: 1 // line width
    },
    plugins: {
      streaming: {
        // frameRate: props.refreshRate // frequency at which the chart is drawn on a display
      }
    },
    legend: {
      labels: {
        fontColor: accentColor,
        fontFamily: "Roboto Mono",
        fontSize: fontSize
      }
    },
    scales: {
      xAxes: [
        {
          realtime: {
            ttl: undefined // automatically delete data after it disappears off the chart
          },
          ticks: { display: false },
          gridLines: { display: false },
          type: "time",
          time: { parser: "DD/MM/YYYY" }
        }
      ],
      yAxes: [
        {
          ticks: {
            display: true,
            fontSize: fontSize,
            fontFamily: "Roboto Mono",
            fontColor: accentColor
            // callback: value => {
            //   return value + unit; // add unit
            // }
          },
          gridLines: {
            display: true,
            color: accentColor,
            zeroLineColor: accentColor // color x-axis
          }
        }
      ]
    }
  };
};

export default function lineChart(props) {
  /* EXPECTED DATA FORMAT:
    data: {
      datasets:[
        {
          // index of values used for positioning on x-axis
          data: [val1, val2, ...] 
        },
        {
          // each value's position is uniquely determined
          data: [{x: _, y: _}]
        }
        ...
      ]
    }
  */

  // Won't work if datasets array is empty
  var data = { datasets: [] };
  for (var i = 0; i < props.datasets.length; i++) {
    data.datasets.push({
      label: props.datasets[i].label,
      fill: false,
      borderColor: colors[i % props.datasets.length], // cycle colours
      borderWidth: 1.5,
      lineTension: 0,
      data: props.datasets[i].data
    });
  }

  return <Line data={data} options={options(props.fontSize)} />;
}
