import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Body from "./body";
// import employeeData from "_constants/FakeData/Employee";
import { RightBar } from "_components/StyledComponent";
import EmployeeInfomation from "./rightBar";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import EmployeeForm from "./EmployeeForm";
import employeeService from '_services/employee.service'
import "./index.scss";

function Employee(props) {
  const [expandIndex, setExpandIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([])
  useEffect(()=>{
    async function fetchData(){
      try {
        let data = await employeeService.getAllEmployee()
        console.log(data)
        switch(data){
          case null: alert('Lỗi server, vui lòng thử lại');break;
          default:setEmployeeData(data)
        }
      } catch (error) {
        
      }
    }
    fetchData()
  },[])
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
  const handleSubmit = async (value) => {
      console.log(value);
      try {
        let result = await employeeService.createEmployee(value)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
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
