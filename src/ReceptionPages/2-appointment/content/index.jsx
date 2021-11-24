import React, { useState } from "react";
import { dateMap, dayLength } from "_constants/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import {Button, } from "@mui/material";
import { CustomPaper } from "_components/StyledComponent";
import { compare2Days, toNewDate } from "_helpers/handleDate";
import Form from '../form';
import "./index.scss";
// import { Scrollbars } from 'react-custom-scrollbars-2';

function Content(props) {
  const [anchorDay, setAnChorDay] = useState(new Date(Date.now()));
  const [dayActive, setDayActive] = useState(new Date(Date.now()));
  const [rendereDate, setRenderedDate] = useState(new Date(Date.now()));
  const [openForm, setOpenForm] = useState(false);
  const handleClose = (e) => {
    // console.log(e);
    setOpenForm(false);
  }
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
                (props.data.filter((d) => new Date(d.TIMES).getDay() === index)
                  .length > 0
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
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "0rem",
            marginLeft: "40%",
          }}
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Tạo lịch hẹn
        </Button>
        <Form open = {openForm} handleClose={handleClose}/>
      </div>
      <div className="appointment-container">
        {/* <Scrollbars style={{ width: '100%', height: 350 }}> */}
        {props.data
          .filter(
            (appointment) => new Date(appointment.TIMES).getDay() === dayActive
          )
          .map((appointment) => (
            <div className="appointment">
              <div className="appointment-header">
                <h3>
                  {`${(
                    "0" + new Date(appointment.TIMES.slice(0, 21)).getHours()
                  ).slice(-2)}:${(
                    "0" + new Date(appointment.TIMES.slice(0, 21)).getMinutes()
                  ).slice(-2)}`}
                </h3>
                <p>{appointment.TYPE ? "Tái Khám" : "Khám mới"}</p>
              </div>
              <div className="appointment-body">
                <div>
                  <h4>{appointment.PATIENT_NAME}</h4>
                  <p>{`BS. ${appointment.EMPLOYEE_NAME}`}</p>
                </div>
                <FontAwesomeIcon icon="ellipsis-v"></FontAwesomeIcon>
              </div>
            </div>
          ))}
        {/* </Scrollbars> */}
      </div>
    </CustomPaper>
  );
}

export default Content;
