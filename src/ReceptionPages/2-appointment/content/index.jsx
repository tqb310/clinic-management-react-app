import React, { useState } from "react";
import { dateMap, dayLength } from "_constants/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackIosNew, ArrowForwardIos, Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { CustomPaper } from "_components/StyledComponent";
import { compare2Days, toNewDate } from "_helpers/handleDate";
import Form from "../form";
import NoResultDate from "./assets/no-date-result.png";
import Table from "_components/Table";
import { AppointmentHeadCells } from "_constants/headCell";
import {
  stateData,
  rows,
  examineType,
} from "_constants/FakeData/AppointmentRequest";
import "./index.scss";
// import { Scrollbars } from 'react-custom-scrollbars-2';

function Content(props) {
  const [anchorDay, setAnChorDay] = useState(new Date(Date.now()));
  const [dayActive, setDayActive] = useState(new Date(Date.now()));
  const [rendereDate, setRenderedDate] = useState(new Date(Date.now()));
  const [openForm, setOpenForm] = useState(false);
  const filteredData = props.data.filter(
    (appointment) =>
      compare2Days(new Date(appointment.TIMES), dayActive) === true
  );
  const handleClose = (e) => {
    // console.log(e);
    setOpenForm(false);
  };
  const dates = [];
  for (let i = 0; i <= 6; i++) {
    dates.push(
      new Date(anchorDay.getTime() + (i - anchorDay.getDay()) * dayLength)
    );
  }
  const dayActiveChange = (date) => {
    setDayActive(date);
    setRenderedDate(date);
  };
  const handleChangeAnchorDay = (weekOffset) => () => {
    const newDate = new Date(anchorDay.getTime() + weekOffset * dayLength);
    setAnChorDay(newDate);
    setRenderedDate(newDate);
  };
  const handleChangeMonth = (monthInc) => () => {
    const newDate = toNewDate(anchorDay, monthInc);
    setAnChorDay(newDate);
    setRenderedDate(newDate);
  };
  return (
    <CustomPaper className="content-container">
      <div className="content-header">
        <h4>Lịch hẹn</h4>
        <div className="search-bar">
          <FontAwesomeIcon icon="search" className="appointment-search-icon" />
          <input type="text" placeholder="Tìm Kiếm" />
        </div>
        <div className="month">
          <h4>{`${
            rendereDate.getMonth() + 1
          }/${rendereDate.getFullYear()}`}</h4>
          <FontAwesomeIcon
            icon="chevron-circle-left"
            className="chevron-circle-left-icon"
            onClick={handleChangeMonth(-1)}
          />
          <FontAwesomeIcon
            icon="chevron-circle-right"
            className="chevron-circle-right-icon"
            onClick={handleChangeMonth(1)}
          />
        </div>
      </div>
      <div className="dates-container">
        <ArrowBackIosNew
          className="dates-container__icon"
          onClick={handleChangeAnchorDay(-7)}
        />
        <ArrowForwardIos
          className="dates-container__icon"
          onClick={handleChangeAnchorDay(7)}
        />
        <div className="dates">
          {dates.map((date, index) => (
            <div
              className={
                (compare2Days(date, dayActive)
                  ? "date--active"
                  : compare2Days(date, new Date(Date.now()))
                  ? "today"
                  : "date") +
                (props.data.filter(
                  (d) => compare2Days(new Date(d.TIMES), date) === true
                ).length > 0
                  ? " dot-notify"
                  : "")
              }
              onClick={() => dayActiveChange(date)}
            >
              <p>{dateMap.get(date.getDay())}</p>
              <p>
                {date.getMonth() === rendereDate.getMonth()
                  ? date.getDate()
                  : `${date.getDate()}/ ${date.getMonth() + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="appointment__addbtn">
        <Button
          style={{
            marginTop: "0rem",
            marginLeft: "40%",
            fontSize: 13,
            color: "#2E3192",
          }}
          startIcon={<Add />}
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Thêm
        </Button>
        <Form open={openForm} handleClose={handleClose} />
      </div>
      <div className="appointment-wrapper">
        {filteredData.length ? (
          <Table
            headCells={AppointmentHeadCells}
            rows={rows}
            stateArray={stateData}
            rowsPerPage={10}
            examineType={examineType}
          />
        ) : (
          <div>
            <img
              src={NoResultDate}
              className="appointment__noresult"
              alt="No results"
              width="512"
            />
          </div>
        )}
      </div>
    </CustomPaper>
  );
}

export default Content;

// filteredData.map((appointment) => (
//   <div className="appointment">
//     <div className="appointment-header">
//       <h3>
//         {`${(
//           "0" +
//           new Date(
//             appointment.TIMES.toString().slice(0, 21)
//           ).getHours()
//         ).slice(-2)}:${(
//           "0" +
//           new Date(
//             appointment.TIMES.toString().slice(0, 21)
//           ).getMinutes()
//         ).slice(-2)}`}
//       </h3>
//       <p>{appointment.TYPE ? "Tái Khám" : "Khám mới"}</p>
//     </div>
//     <div className="appointment-body">
//       <div>
//         <h4>{appointment.PATIENT_NAME}</h4>
//         <p>{`BS. ${appointment.EMPLOYEE_NAME}`}</p>
//       </div>
//       <FontAwesomeIcon icon="ellipsis-v"></FontAwesomeIcon>
//     </div>
//   </div>
// ))