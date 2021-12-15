import React, { useState } from "react";
import { CustomPaper } from "_components/StyledComponent";
import { Scrollbars } from "react-custom-scrollbars-2";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "./index.scss";
// import PropTypes from 'prop-types'

function AppointmentItem({ time, type, name }) {
  return (
    <div className="DTAppointmentItem">
      <div className="DTAppointmentItem__time">
        <span>{time}</span>
        <span>{type}</span>
      </div>
      <div className="DTAppointmentItem__info">
        <p>{name}</p>
      </div>
    </div>
  );
}

function Examining(props) {
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <CustomPaper className="DTAppointment">
      <div className="DTAppointment__header">
        <p>Lịch hẹn</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            size="small"
            value={selectDate}
            onChange={(date) => setSelectDate(date)}
            format="DD-MM-YYYY"
            renderInput={(params) => {
              // console.log(params);
              return (
                <TextField
                  sx={{
                    width: "105px",
                    ".MuiInputBase-root": {
                      fontSize: 14,
                    },
                  }}
                  size="small"
                  variant="standard"
                  {...params}
                />
              );
            }}
          />
        </LocalizationProvider>
      </div>
      <Scrollbars style={{ width: "100%", height: "90%" }} autoHide={true}>
        <div className="DTAppointment__content">
          <AppointmentItem
            time="7:00 - 7:15"
            type="Tái khám"
            name="Trương Quốc Bảo"
          />
          <AppointmentItem
            time="7:15 - 7:30"
            type="Khám mới"
            name="Đặng Ngọc Liêm"
          />
          <AppointmentItem
            time="7:15 - 7:30"
            type="Khám mới"
            name="Đặng Ngọc Liêm"
          />
          <AppointmentItem
            time="7:15 - 7:30"
            type="Khám mới"
            name="Đặng Ngọc Liêm"
          />
          <AppointmentItem
            time="7:15 - 7:30"
            type="Khám mới"
            name="Đặng Ngọc Liêm"
          />
          <AppointmentItem
            time="7:15 - 7:30"
            type="Khám mới"
            name="Đặng Ngọc Liêm"
          />
          <AppointmentItem
            time="7:15 - 7:30"
            type="Khám mới"
            name="Đặng Ngọc Liêm"
          />
        </div>
      </Scrollbars>
    </CustomPaper>
  );
}

Examining.propTypes = {};

export default Examining;
