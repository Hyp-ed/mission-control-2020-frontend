import React from "react";
import "./DataContainer.css";
import DataRow from "./DataRow";
import DataList from "./DataList";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import testData from './testData.json';

export default props => {

  const data = testData;

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
      } else {
        return <DataRow data={list} level={level - 1}></DataRow>
      }
    });

  return (
    <SimpleBar className="data-container" forceVisible="y" autoHide={false}>
      {getLists(data, 0)}
    </SimpleBar>
  );
};
