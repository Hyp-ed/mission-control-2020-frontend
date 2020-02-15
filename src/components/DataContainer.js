import React from "react";
import "./DataContainer.css";
import DataRow from "./DataRow";
import DataRowString from "./DataRowString";
import DataList from "./DataList";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import testData from './testData.json';

export default props => {

  const getLists = (lists, level) =>
    lists.map((list, i) => {
      if (Array.isArray(list.value)) {
        return (
          <DataList
            title={list.name}
            value={getLists(list.value, level + 1)}
            level={level}
          ></DataList>
        );
      } else if (isNaN(list.value)) {
        return <DataRowString data={list} level={level - 1}></DataRowString>
      }
      else {
        return <DataRow data={list} level={level - 1}></DataRow>
      }
    });

  if (props.podData !== null) {
    // const data = testData;
    const data = props.podData.additional_data;
    return (
      <SimpleBar className="data-container" forceVisible="y" autoHide={false}>
        {getLists(data, 0)}
      </SimpleBar>
    );
  }
  else {
    return (<SimpleBar className="data-container" forceVisible="y" autoHide={false}>
    
  </SimpleBar>)
  }
  
};
