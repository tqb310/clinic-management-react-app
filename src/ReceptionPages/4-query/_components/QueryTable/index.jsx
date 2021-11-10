import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Delete, FilterList } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";

function createData(orderNum, patientName, phoneNumber, checkIn, room, state) {
  return {
    orderNum,
    patientName,
    phoneNumber,
    checkIn,
    room,
    state,
  };
}

const rows = [
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 0),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 0),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 2),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 2),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
  createData(24, "Nguyễn Văn A", "0123456789", "8:30", 1, 1),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "orderNum",
    numeric: true,
    disablePadding: true,
    label: "Số thứ tự",
  },
  {
    id: "patientName",
    numeric: false,
    disablePadding: false,
    label: "Tên bệnh nhân",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "checkIn",
    numeric: false,
    disablePadding: false,
    label: "Giờ vào",
  },
  {
    id: "room",
    numeric: true,
    disablePadding: false,
    label: "Phòng",
  },
  {
    id: "state",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{backgroundColor: "#EBF0FF", color: "#2E3192"}}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const stateData = {
  0: {
    label: "Đang khám",
    colors: ["#ECFBF6", "#03B575"],
  },
  1: {
    label: "Đang chờ",
    colors: ["#EBF0FF", "#1F58E7"],
  },
  2: {
    label: "Qua lượt",
    colors: ["#FFF3F2", "#E74F48"],
  },
};
const StateComp = ({ state }) => {
  return (
    <div style={{ backgroundColor: stateData[state]["colors"][0], 
                  width: 100, 
                  textAlign: "center",
                  color: stateData[state]["colors"][1]}}>
      {stateData[state]["label"]}
    </div>
  );
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderNum);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.orderNum)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderNum}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.orderNum}
                      </TableCell>
                      <TableCell align="left">{row.patientName}</TableCell>
                      <TableCell align="left">{row.phoneNumber}</TableCell>
                      <TableCell align="left">{row.checkIn}</TableCell>
                      <TableCell align="left">{row.room}</TableCell>
                      <TableCell align="left">
                        <StateComp state={row.state}></StateComp>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
