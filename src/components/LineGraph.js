import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./LineGraph.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import { getDataPointValue } from "../DataTools";
import { capitalize } from "lodash";

const COLORS = [
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

const IGNORE_KEY = "crucial_data";
const DELIMITER = " > ";

export default function LineGraph(props) {
  const [pathData, setPathData] = useState({});

  useDeepEffect(() => {
    setPathData(oldData => {
      props.paths.forEach(path => {
        let dataPoint = {
          x: props.data.time,
          y: getDataPointValue(props.data.telemetryData, path)
        };
        if (oldData.hasOwnProperty(path)) {
          oldData[path] = [...oldData[path], dataPoint];
        } else {
          oldData[path] = [dataPoint];
        }
      });
      return oldData;
    });
  }, [props.data]);

  const getLabel = path => {
    const parentKey = path[path.length - 2];
    const key = path[path.length - 1];
    if (parentKey === IGNORE_KEY) {
      return capitalize(key);
    } else {
      return [parentKey, key].join(DELIMITER);
    }
  };

  /**
   * Create an object containing all data
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
      datasets: Array.from(props.paths, (path, i) => {
        return {
          label: getLabel(path),
          data: pathData.hasOwnProperty(path) ? pathData[path] : [],
          borderColor: COLORS[i % COLORS.length] // cycle colors
        };
      })
    };
  };

  return (
    <div className="graph-wrapper">
      <div className="graph-buttons">
        <FontAwesomeIcon
          className="close-button"
          onClick={() => props.removeGraph(props.ID)}
          icon={faTimes}
        />
        <span
          className="datapoint-button"
          onClick={() => props.onSelectDatapointsClicked(props.ID)}
        >
          Add datapoint
        </span>
      </div>
      <div>
        <Line
          data={getData}
          height={window.innerHeight / 4}
          width={window.innerWidth / 4.3}
        />
      </div>
    </div>
  );
}
