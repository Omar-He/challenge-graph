import React from "react";
import "./dataTable.css";
import HideIcon from "../icons/hideIcon";
import CloseIcon from "../icons/closeIcon";
import useStore from "../store/store";
import ShowIcon from "../icons/showIcon";
import {TableRow, kidsType} from "../global";

interface DataTableProps {
  data: TableRow[];
  title: string;
}


const DataTable: React.FC<DataTableProps> = ({ title, data }) => {
  const { expandRow, hideRow, isRowExpanded, removeRow } = useStore();
  if (!data?.length) return null;

  return (
    <div className="main-container">
      <label className="table-title">{title}</label>
      <table>
        <thead>
          <tr>
            <td></td>
            {Object.keys(data[0].data).map((columnTitle, key) => (
              <td key={key}>{columnTitle}</td>
            ))}
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => {
            return (
              <React.Fragment key={row.uuid}>
                <tr>
                  <td>
                    {checkIfKidsExist(row.kids) && (
                      <>
                        {isRowExpanded(row.uuid) ? (
                          <span
                            className="expand-arrow"
                            onClick={() => hideRow(row.uuid)}
                          >
                            <HideIcon />
                          </span>
                        ) : (
                          <span
                            className="expand-arrow"
                            onClick={() => expandRow(row)}
                          >
                            <ShowIcon />
                          </span>
                        )}
                      </>
                    )}
                  </td>
                  {Object.values(row.data).map((cellData, cellKey) => {
                    return <td key={cellKey}>{cellData}</td>;
                  })}
                  <td>
                    <span className="close-icon" onClick={() => removeRow(row)}>
                      <CloseIcon />
                    </span>
                  </td>
                </tr>

                {checkIfKidsExist(row.kids) && isRowExpanded(row.uuid) && (
                  <tr>
                    <td
                      colSpan={Object.keys(data[0].data).length + 2}
                      className="child-table"
                    >
                      <DataTable
                        title={Object.keys(row.kids)[0]}
                        data={Object.values(row.kids)[0].records}
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

function checkIfKidsExist(kids: kidsType) {
  return Object.values(kids)[0]?.records.length > 0;
}
export default DataTable;
