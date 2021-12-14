import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Body from "./body";
import employeeData from "_constants/FakeData/Employee";
import { RightBar } from "_components/StyledComponent";
import EmployeeInfomation from "./rightBar";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import EmployeeForm from "./EmployeeForm";
import "./index.scss";

function Employee(props) {
  const [expandIndex, setExpandIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
  }
  const changeExpandIndex = (index) => {
    if (expandIndex == index) {
      setExpandIndex(-1);
    } else {
      setExpandIndex(index);
    }
  };
  const handleSubmit = (value) => {
      console.log(value);
  }
  return (
    <div className="manage-employee-wrap">
      <Header></Header>
      <div style={{display: 'flex', justifyContent: 'right', marginTop: 20}}>
        <Button startIcon={<Add/>} onClick={() => setOpen(true)}>Thêm</Button>
      </div>
      <Body
        className="manage-employee-wrap-body"
        employees={employeeData}
        expandIndex={expandIndex}
        handleExpandIndex={changeExpandIndex}
      ></Body>
      <RightBar>
        <EmployeeInfomation
          employee={expandIndex != -1 ? employeeData[expandIndex] : null}
        ></EmployeeInfomation>
      </RightBar>
      <EmployeeForm open={open} handleClose={handleClose} handleSubmit={handleSubmit}/>
    </div>
  );
}

Employee.propTypes = {};

export default Employee;
