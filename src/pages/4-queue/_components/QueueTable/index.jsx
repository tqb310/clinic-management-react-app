import React, { useState, useEffect } from "react";
// import { Box, Checkbox, IconButton } from "@mui/material";
// import {
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   Sync,
// } from "@mui/icons-material";
import { headCells } from "_constants/headCell";
import { stateData } from "_constants/FakeData/QueryTable";
import Table from "_components/shared/Table";
import "./index.scss";
// import PropTypes from "prop-types";

export default function EnhancedTable({ data, selectIndex, handleSelectIndex }) {
  const [selectId, setSelectId] = useState('');
  useEffect(() => {
    if (data.length > 0)
      setSelectId(data[selectIndex].id)
    else
      setSelectId('')
  }, [selectIndex])
  const handleSelectId = (id) => {
    let index = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].id.localeCompare(id) == 0) {
        index = i;
        break
      }
    }
    handleSelectIndex(index)
    setSelectId(data[index].id)
  }
  // const [page, setPage] = useState(0);
  // const [selectId, setSelectId] = useState(rows[0].id);
  // const [height, setHeight] = useState(0);
  // const ref = useRef(null);
  return (
    <Table
      headCells={headCells}
      rows={data} // Dữ liệu cho table
      stateArray={stateData}
      rowsPerPage={10}
      isCheckbox={true}
      selectId={selectId}
      setSelectId={handleSelectId}
      isSwap
    />
  );
}
