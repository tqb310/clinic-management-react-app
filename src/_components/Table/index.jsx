import React, { useState, useEffect, useRef } from "react";
import { Box, Checkbox, IconButton } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Sync,
} from "@mui/icons-material";
import { EnhancedTableHead, StateComp } from "./EnhancedTableHead";
import "./index.scss";
// import PropTypes from "prop-types";

export default function EnhancedTable({
  headCells,
  rows,
  stateArray,
  rowsPerPage,
  isCheckbox,
  examineType,
  selectId,
  setSelectId
}) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  // const [selectId, setSelectId] = useState(rows[0].id);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const h =(rows.length != 0)? ref.current.clientHeight : 0;
    setHeight(h);
  }, []);
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
            headCells={headCells}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            isCheckbox={isCheckbox}
          />
        </thead>
        <tbody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              const isItemSelected = isSelected(row.id);
              const { state, type, ...tempRow } = row;
              const rowsField = Object.keys(tempRow);
              //   console.log(examineType[type]["colors"]);
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
                  {isCheckbox && (
                    <td padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected && row.state !== 0}
                        disabled={state === 0}
                        onChange={(event) => handleClick(event, row.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {rowsField.slice(1).map((field, index) => (
                    <td
                      key={index}
                      align={field === "patientName" ? "left" : "center"}
                      style={{
                        padding: isCheckbox ? "0" : ".6rem 0",
                        color:
                          state === 2 ? stateArray[2]["colors"][1] : "#444",
                        fontWeight: 500,
                        fontSize: 14.5,
                      }}
                      ref={ref}
                    >
                      {field === "patientName" && examineType && (
                        <span
                          style={
                            type === 0
                              ? {
                                  backgroundColor:
                                    state !== 2
                                      ? examineType[type]["colors"][
                                          "background"
                                        ]
                                      : "#f9f9f9",
                                  color:
                                    state !== 2 &&
                                    examineType[type]["colors"]["color"],
                                  fontSize: 13,
                                  display: "inline-block",
                                  padding: ".2rem .5rem",
                                  marginRight: ".2rem",
                                  borderRadius: "1rem",
                                }
                              : {}
                          }
                        >
                          {type === 0 && examineType[0]["label"]}
                        </span>
                      )}
                      {tempRow[field]}
                    </td>
                  ))}
                  <td align="center">
                    <StateComp
                      stateArray={stateArray}
                      state={row.state}
                    ></StateComp>
                  </td>
                  <td align="center">
                    {row.state !== 0 &&
                      selected.length === 1 &&
                      selected.indexOf(row.id) === -1 && (
                        <Sync
                          className="swapicon"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                  </td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr id="emptyRow" style={{ height: (height + 1) * emptyRows }}>
              <td
                sx={{ borderBottom: "none" }}
                colSpan={headCells.length + 1}
              />
            </tr>
          )}
        </tbody>
      </table>
      <Box className="querytable__pagination">
        <span>{`${page * rowsPerPage + 1} - ${Math.min(
          (page + 1) * rowsPerPage,
          rows.length
        )} of ${rows.length}`}</span>
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
