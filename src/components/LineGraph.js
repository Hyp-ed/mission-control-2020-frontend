import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./LineChart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";

const graph_colors = [
  "#BF000B", // dark red
  "#009AB0", // blue
  "#FF9B00", // yellow
  "#FFFFFF", // white
  "#A7CEE3", // aqua
  "#1F79B4", // pink
  "#FDBF70", // peach
  "#FF7F02", // orange
  "#CAB3D7", // violet
  "#6B3D9A", // purple
  "#B15928", // brown
  "#FEFF99", // lemon
  "#4BBEBE" // green
];
const accentColor = "#8F8F8F";

/**
 * @param {number} fontSize
 * @returns an object that changes the look of ChartJS graphs
 */
const options = fontSize => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    animation: {
      duration: 0 // ensure that the lines scale with y-axis on y-axis resize without delay
    },
    elements: {
      point: {
        radius: 0
      }
    },
    style: {
      strokeWidth: 1 // line width
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
            ttl: undefined // automatically delete data after it disappears off the graph
          },
          ticks: { display: false },
          gridLines: { display: false },
          type: "time",
          distribution: "linear",
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

/**
 * React effect hook that deep compares objects in dependency array
 */
const useDeepEffect = (fn, deps) => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index])
    );

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
};

export default function LineGraph(props) {
  const [datasets, setDatasets] = useState({});

  useDeepEffect(() => {
    setDatasets(old_dataset => {
      props.datapoints.forEach(datapoint => {
        let graph_datapoint = {
          x: props.data.time,
          y: props.getValue(props.data.telemetryData, datapoint.path)
        };
        if (old_dataset.hasOwnProperty(datapoint.path)) {
          old_dataset[datapoint.path] = [
            ...old_dataset[datapoint.path],
            graph_datapoint
          ];
        } else {
          old_dataset[datapoint.path] = [graph_datapoint];
        }
      });
      return old_dataset;
    });
  }, [props.data, props.datapoints]);

  /**
   * Generates an unambiguous label for a datapoint
   * If no two datapoints share the same name, the datapoint name is returned
   * If multiple datapoints share the same name, the previous key from path array is prepended to the datapoint names
   * Example: The user wants to display these two datapoints:
   * ... LP 1.Individual Voltages.Cell 1
   * ... LP 1.Individual Temperatures.Cell 1
   * The output is: "Individual Voltages Cell 1" and "Individual Temperatures.Cell 1"
   * @param {object} datapoint
   * @returns a unique label for a datapoint
   */
  const getDatapointLabel = datapoint => {
    let numOccurrences = 0;
    props.datapoints.forEach(d => {
      if (d.name === datapoint.name) {
        numOccurrences++;
      }
    });
    if (numOccurrences > 1 && datapoint.path.length > 1) {
      return [datapoint.path[datapoint.path.length - 2], datapoint.name]
        .join(" ")
        .toUpperCase();
    }
    return datapoint.name.toUpperCase();
  };

  /**
   * Create an object containing all datasets, along with labels and line colors
   * Format:
   *  { datasets: [
   *      {
   *        data: [{x: _, y: _}]
   *      },
   *      {...}
   *    ]
   *  }
   * @returns a data object readable by ChartJS
   */
  const getData = () => {
    return {
      datasets: Array.from(props.datapoints, (datapoint, i) => {
        return {
          label: getDatapointLabel(datapoint),
          data: datasets.hasOwnProperty(datapoint.path)
            ? datasets[datapoint.path]
            : [],
          unit: datapoint.unit,
          borderColor: graph_colors[i % graph_colors.length], // cycle colors
          fill: false,
          borderWidth: 1.5,
          lineTension: 0
        };
      })
    };
  };

  return (
    <div className="graph-wrapper">
      <div className="graph-buttons">
        <FontAwesomeIcon
          className="close-button"
          onClick={() => props.removeGraph(props.id)}
          icon={faTimes}
        />
        <span
          className="datapoint-button"
          onClick={() => props.onSelectDatapointsClicked(props.id)}
        >
          Add datapoint
        </span>
      </div>
      <div>
        <Line
          data={getData}
          options={options(props.fontSize)}
          // height={window.innerHeight / 4}
          // width={window.innerWidth / 4.3}
        />
      </div>
    </div>
  );
}
