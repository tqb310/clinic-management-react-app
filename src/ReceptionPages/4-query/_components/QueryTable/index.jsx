import React from "react";
import { Box, Checkbox, IconButton } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Sync,
} from "@mui/icons-material";
import headCells from "_constants/queryHeadCell";
import { rows, stateData } from "_constants/FakeData/QueryTable";
import "./index.scss";
// import PropTypes from "prop-types";
const lightest_blue = "#EBF0FF",
  indigo = "#2E3192";

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <tr style={{ backgroundColor: lightest_blue }}>
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
      {headCells.map((headCell) => (
        <th
          key={headCell.id}
          style={{
            color: indigo,
            fontWeight: 700,
            width: headCell.width,
            padding: "1rem 0",
            textAlign: "center",
          }}
        >
          {headCell.label}
        </th>
      ))}
    </tr>
  );
}

const StateComp = ({ state }) => {
  return (
    <div
      style={{
        backgroundColor: stateData[state]["colors"][0],
        width: 100,
        margin: "auto",
        textAlign: "center",
        color: stateData[state]["colors"][1],
        borderRadius: 5,
        padding: 2.5,
      }}
    >
      {stateData[state]["label"]}
    </div>
  );
};

const rowsPerPage = 9;

export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [selectId, setSelectId] = React.useState(rows[0].id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handlePageChange = (action) => {
    if (action === 1) {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  return (
    <Box>
      <table className="querytable" aria-labelledby="tableTitle" size="medium">
        <thead>
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
        </thead>
        <tbody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.id);

              return (
                <tr
                  onClick={() => setSelectId(row.id)}
                  className={!selectId.localeCompare(row.id) ? "active" : ""}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <td padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected && row.state !== 0}
                      disabled={row.state === 0}
                      onChange={(event) => handleClick(event, row.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td align="center">{row.orderNum}</td>
                  <td align="center">{row.patientName}</td>
                  <td align="center">{row.phoneNumber}</td>
                  <td align="center">{row.checkIn}</td>
                  <td align="center">{row.room}</td>
                  <td align="center">
                    <StateComp state={row.state}></StateComp>
                  </td>
                  <td align="center">
                    {row.state !== 0 
                     && selected.length === 1
                     && selected.indexOf(row.id) === -1 
                     && (
                      <Sync className="swapicon" onClick={(e) => e.stopPropagation()}/>
                    )}
                  </td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td sx={{ borderBottom: "none" }} colSpan={7} />
            </tr>
          )}
        </tbody>
      </table>
      <Box className="querytable__pagination">
        <span>{`${page * rowsPerPage + 1} - ${(page + 1) * rowsPerPage} of ${
          rows.length
        }`}</span>
        <IconButton
          className="querytable__prepage"
          disabled={page === 0}
          onClick={() => handlePageChange(1)}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          className="querytable__nextpage"
          disabled={page === Math.ceil(rows.length / rowsPerPage) - 1}
          onClick={() => handlePageChange(2)}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
}
