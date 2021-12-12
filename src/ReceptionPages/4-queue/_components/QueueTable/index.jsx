import React from "react";
// import { Box, Checkbox, IconButton } from "@mui/material";
// import {
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   Sync,
// } from "@mui/icons-material";
import {headCells} from "_constants/headCell";
import { stateData } from "_constants/FakeData/QueryTable";
import Table from "_components/Table";
import "./index.scss";
// import PropTypes from "prop-types";

export default function EnhancedTable({data}) {
  // const [selected, setSelected] = useState([]);
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
    />
  );
}
