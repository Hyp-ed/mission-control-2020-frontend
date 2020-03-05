import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./LineChart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const colors = [
  "#BF000B", // dark red
  "#009AB0", // blue
  "#FF9B00", // yellow
  "#FFFFFF" // white
];

const accentColor = "#8F8F8F";
const options = fontSize => {
  return {
    responsive: true,
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

const getDataset = (object, keys) => {
  if (Array.isArray(object)) {
    let key = keys[0];
    keys = keys.slice(1);
    return getDataset(
      object.find(o => o.name === key),
      keys
    );
  } else if (object.hasOwnProperty("value") && Array.isArray(object.value)) {
    let key = keys[0];
    keys = keys.slice(1);
    return getDataset(
      object.value.find(o => o.name === key),
      keys
    );
  } else if (keys.length > 0) {
    let key = keys[0];
    keys = keys.slice(1);
    return getDataset(object[key], keys);
  } else {
    return object.value;
  }
};

const useDeepEffect = (fn, deps) => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) =>
      _.isEqual(obj, deps[index])
    );

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
};

export default function LineChart(props) {
  const [datasets, setDatasets] = useState(new WeakMap());

  // objects used as dependencies => carry out deep comparison
  useDeepEffect(() => {
    // console.log(getData());
    setDatasets(old => {
      props.keyArrays.forEach(keyArray => {
        let datapoint = {
          x: props.data.time,
          y: getDataset(props.data.telemetryData, keyArray)
        };
        if (old.has(keyArray)) {
          old.set(keyArray, [...old.get(keyArray), datapoint]);
        } else {
          old.set(keyArray, [datapoint]);
        }
      });
      return old;
    });
  }, [props.data, props.keyArrays]);

  const getData = () => {
    return {
      datasets: Array.from(props.keyArrays, (keyArray, i) => {
        if (!datasets.has(keyArray)) console.log("yo");
        return {
          label: `TestVal ${i}`,
          data: datasets.has(keyArray) ? datasets.get(keyArray) : [],
          // unit: "test",
          fill: false,
          borderColor: colors[i % colors.length], // cycle colours
          borderWidth: 1.5,
          lineTension: 0
        };
      })
    };
  };

  /* FORMAT of *data* prop:
    datasets: [
      {
        data: [{x: _, y: _}]
      }, 
      {...}
    ]
  */

  return (
    <div className="chart-wrapper">
      <div className="chart-buttons">
        <FontAwesomeIcon
          className="close-button"
          onClick={() => props.removeChart(props.id)}
          icon={faTimes}
        />
        <span
          className="datapoint-button"
          onClick={() => props.selectDatapoints(props.id)}
        >
          Add datapoint
        </span>
      </div>
      <div>
        <Line data={getData()} options={options(props.fontSize)} />
      </div>
    </div>
  );
}
