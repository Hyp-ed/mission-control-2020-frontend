import React from "react";
import "./DataContainer.css";
import DataRow from "./DataRow";
import DataHeader from "./DataHeader";

export default props => {
  // const data = [
  //   {
  //     name: "Batteries",
  //     value: [
  //       {
  //         name: "Batteries",
  //         value: [
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 5,
  //             unit: "C"
  //           },
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 10,
  //             unit: "C"
  //           },
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 25,
  //             unit: "C"
  //           },
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 50,
  //             unit: "C"
  //           },
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 75,
  //             unit: "C"
  //           },
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 90,
  //             unit: "C"
  //           },
  //           {
  //             name: "Temperature",
  //             min: 1000,
  //             max: 1000,
  //             value: 95,
  //             unit: "C"
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  const data = [
    {
      name: "Batteries",
      value: [
        {
          name: "Low Power Batteries",
          value: [
            {
              name: "LP 1",
              value: [
                {
                  name: "Voltage",
                  min: 17.5,
                  max: 29.4,
                  value: 24.5,
                  unit: "V"
                },
                {
                  name: "Current",
                  min: 0,
                  max: 50,
                  value: 45,
                  unit: "A"
                },
                {
                  name: "Charge",
                  min: 20,
                  max: 100,
                  value: 70,
                  unit: "%"
                },
                {
                  name: "Temperature",
                  min: 10,
                  max: 60,
                  value: 35,
                  unit: "C"
                },
              ]
            },
            {
              name: "LP 2",
              value: [
                {
                  name: "Voltage",
                  min: 17.5,
                  max: 29.4,
                  value: 24.5,
                  unit: "V"
                },
                {
                  name: "Current",
                  min: 0,
                  max: 50,
                  value: 45,
                  unit: "A"
                },
                {
                  name: "Charge",
                  min: 20,
                  max: 100,
                  value: 70,
                  unit: "%"
                },
                {
                  name: "Temperature",
                  min: 10,
                  max: 60,
                  value: 35,
                  unit: "C"
                },
              ]
            },
            {
              name: "LP 3",
              value: [
                {
                  name: "Voltage",
                  min: 17.5,
                  max: 29.4,
                  value: 24.5,
                  unit: "V"
                },
                {
                  name: "Current",
                  min: 0,
                  max: 50,
                  value: 45,
                  unit: "A"
                },
                {
                  name: "Charge",
                  min: 20,
                  max: 100,
                  value: 70,
                  unit: "%"
                },
                {
                  name: "Temperature",
                  min: 10,
                  max: 60,
                  value: 35,
                  unit: "C"
                },
              ]
            }
          ]
        },
        {
          name: "High Power Batteries",
          value: [
            {
              name: "HP 1",
              value: [
                {
                  name: "Voltage",
                  min: 100,
                  max: 129.6,
                  value: 115,
                  unit: "V"
                },
                {
                  name: "Current",
                  min: 0,
                  max: 350,
                  value: 100,
                  unit: "A"
                },
                {
                  name: "Charge",
                  min: 20,
                  max: 100,
                  value: 70,
                  unit: "%"
                },
                {
                  name: "Avg Temperature",
                  min: 10,
                  max: 65,
                  value: 35,
                  unit: "C"
                },
                {
                  name: "Low Temperature",
                  min: 10,
                  max: 65,
                  value: 35,
                  unit: "C"
                },
                {
                  name: "High Temperature",
                  min: 10,
                  max: 65,
                  value: 35,
                  unit: "C"
                },
                {
                  name: "Low Voltage Cell",
                  min: 2.7,
                  max: 3.6,
                  value: 3,
                  unit: "V"
                },
                {
                  name: "High Voltage Cell",
                  min: 2.7,
                  max: 3.6,
                  value: 3.2,
                  unit: "V"
                },
              ]
            },
            {
              name: "HP 2",
              value: [
                {
                  name: "Voltage",
                  min: 100,
                  max: 129.6,
                  value: 115,
                  unit: "V"
                },
                {
                  name: "Current",
                  min: 0,
                  max: 350,
                  value: 100,
                  unit: "A"
                },
                {
                  name: "Charge",
                  min: 20,
                  max: 100,
                  value: 70,
                  unit: "%"
                },
                {
                  name: "Avg Temperature",
                  min: 10,
                  max: 65,
                  value: 35,
                  unit: "C"
                },
                {
                  name: "Low Temperature",
                  min: 10,
                  max: 65,
                  value: 35,
                  unit: "C"
                },
                {
                  name: "High Temperature",
                  min: 10,
                  max: 65,
                  value: 35,
                  unit: "C"
                },
                {
                  name: "Low Voltage Cell",
                  min: 2.7,
                  max: 3.6,
                  value: 3,
                  unit: "V"
                },
                {
                  name: "High Voltage Cell",
                  min: 2.7,
                  max: 3.6,
                  value: 3.2,
                  unit: "V"
                },
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Overall Temperature",
      min: 20,
      max: 100,
      value: 110,
      unit: "C"
    },
  ]

  const getRow = (data, level) => <DataRow data={data} level={level}></DataRow>;

  const getList = (obj, level) =>
    obj.map(obj2 => {
      if (Array.isArray(obj2.value)) {
        return [<DataHeader title={obj2.name} level={level}></DataHeader>, getList(obj2.value, level + 1)];
      } else {
        return getRow(obj2, level - 1);
      }
    });

  return (
    <div className="data-container">
      <div className="data-container-line level-1"></div>
      <div className="data-container-line level-2"></div>
      {getList(data, 0)}
    </div>
  );
};
