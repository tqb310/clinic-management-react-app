import React from "react";
import { Checkbox } from "@mui/material";

const lightest_blue = "#EBF0FF",
  indigo = "#2E3192";

export function EnhancedTableHead({
  headCells,
  onSelectAllClick,
  numSelected,
  rowCount,
  isCheckbox,
}) {
  return (
    <tr style={{ backgroundColor: lightest_blue }}>
      {isCheckbox && (
        <td style={{ width: "5%" }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </td>
      )}
      {headCells.map((headCell) => (
        <th
          key={headCell.id}
          style={{
            color: indigo,
            fontWeight: 700,
            width: headCell.width,
            padding: "1rem 0",
            textAlign: headCell.id === "patientName" ? "left" : "center",
          }}
        >
          {headCell.label}
        </th>
      ))}
    </tr>
  );
}

export const StateComp = ({ stateArray, state }) => {
  return (
    <div
      style={{
        backgroundColor: state !== undefined && stateArray[state]["colors"][0],
        width: "auto",
        margin: "auto",
        textAlign: "center",
        color: state !== undefined && stateArray[state]["colors"][1],
        borderRadius: 5,
        padding: 2.5,
        fontWeight: 500,
      }}
    >
      {state !== undefined && stateArray[state]["label"]}
    </div>
  );
};
