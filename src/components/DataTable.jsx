import React, { useState } from "react";
import "./dataTable.scss";
import useStore from "../store/store";
import ExpandIcon from "../icons/expandIcon";
import CloseIcon from "../icons/closeIcon";

const DataTable = ({ title, allData }) => {
  const removeItem = useStore((state) => state.removeItem);
  const [clickedRowKey, setRowKey] = useState();

  const collapse = (key) => {
    setRowKey((clickedKey) => (clickedKey === key ? null : key));
  };

  const remove = (key) => {
    removeItem(allData, key);
    setRowKey(null);
  };

  if (!allData.length) return <div>No Data to show</div>;
  return (
    <div className="main-container">
      <label className="table-title">{title}</label>
      <table>
        <thead>
          <tr>
            <td></td>
            {allData &&
              Object.keys(allData[0].data).map((columnTitle, key) => (
                <td key={key}>{columnTitle}</td>
              ))}
            <td></td>
          </tr>
        </thead>
        <tbody>
          {allData?.map((row, rowKey) => {
            return (
              <React.Fragment key={rowKey}>
                <tr>
                  <td>
                    {Object.keys(row.kids).length > 0 ? (
                      <span
                        className="expand-arrow"
                        onClick={() => collapse(rowKey)}
                      >
                        <ExpandIcon />
                      </span>
                    ) : null}
                  </td>
                  {Object.values(row.data).map((cellData, cellKey) => {
                    return <td key={cellKey}>{cellData}</td>;
                  })}
                  <td>
                    <span className="close-icon" onClick={() => remove(rowKey)}>
                      <CloseIcon />
                    </span>
                  </td>
                </tr>
                {Object.keys(row.kids).length > 0 && clickedRowKey === rowKey && (
                  <tr>
                    <td
                      colSpan={Object.keys(allData[0].data).length + 2}
                      className="child-table"
                    >
                      <DataTable
                        title={Object.keys(row.kids)[0]}
                        allData={Object.values(row.kids)[0].records}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
