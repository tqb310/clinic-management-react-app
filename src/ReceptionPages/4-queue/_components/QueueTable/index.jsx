import React from "react";
// import { Box, Checkbox, IconButton } from "@mui/material";
// import {
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   Sync,
// } from "@mui/icons-material";
import {headCells} from "_constants/headCell";
import { rows, stateData } from "_constants/FakeData/QueryTable";
import Table from "_components/Table";
import "./index.scss";
// import PropTypes from "prop-types";
// const lightest_blue = "#EBF0FF",
//   indigo = "#2E3192";

export default function EnhancedTable() {
  // const [selected, setSelected] = useState([]);
  // const [page, setPage] = useState(0);
  // const [selectId, setSelectId] = useState(rows[0].id);
  // const [height, setHeight] = useState(0);
  // const ref = useRef(null);
  return (
    <Table
      headCells={headCells}
      rows={rows}
      stateArray={stateData}
      rowsPerPage={10}
      isCheckbox={true}
    />
  );
}
