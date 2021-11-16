import React, { useState } from "react";
// import { Scrollbars } from 'react-custom-scrollbars-2';
import { dateMap, dayLength } from "_constants/date";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomPaper } from "_components/StyledComponent";
import getBeginDate from "_helpers/getBeginDate";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const data = [
  {
    time: "8:30",
    type: "Tái khám",
    name: "Nguyễn Văn A",
    doctor: "BS. Phúc",
  },
  {
    time: "8:30",
    type: "Tái khám",
    name: "Nguyễn Văn A",
    doctor: "BS. Phúc",
  },
  {
    time: "8:30",
    type: "Tái khám",
    name: "Nguyễn Văn A",
    doctor: "BS. Phúc",
  },
  {
    time: "8:30",
    type: "Tái khám",
    name: "Nguyễn Văn A",
    doctor: "BS. Phúc",
  },
  {
    time: "8:30",
    type: "Tái khám",
    name: "Nguyễn Văn A",
    doctor: "BS. Phúc",
  },
  {
    time: "8:30",
    type: "Tái khám",
    name: "Nguyễn Văn A",
    doctor: "BS. Phúc",
  },
];

function updateDates(
  week,
  setBeginDay,
  setSelected,
  now,
  beginDay,
  dates,
  setSelectedMonth,
  setSelectedYear,
  month,
  year
) {
  let todayFlag = 0,
    monthFlag = 0,
    yearFlag = 0,
    tempDate;
  if (week < 0) setBeginDay(beginDay - 7 * dayLength);
  else setBeginDay(beginDay + 7 * dayLength);
  dates.forEach((date) => {
    tempDate = date;
    if (
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate() + week
    )
      todayFlag = 1;
    if (date.getMonth() + 1 === month) monthFlag = 1;
    if (date.getFullYear() + 1 === year) yearFlag = 1;
  });
  if (todayFlag === 1) setSelected(now.getDay() - 1);
  else setSelected(0);
  if (monthFlag === 0) setSelectedMonth(tempDate.getMonth());
  if (yearFlag === 0) setSelectedYear(tempDate.getFullYear());
}

function Content() {
  const [beginDay, setBeginDay] = useState(getBeginDate().getTime());
  const [now, setNow] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState(new Date().getDay() - 1);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(beginDay + i * dayLength);
    dates.push(d);
    // console.log(d.getTime());
  }

  return (
    <CustomPaper className="content-container">
      <div className="content-header">
        <h4>Lịch hẹn</h4>
        <div className="search-bar">
          <FontAwesomeIcon icon="search" className="appointment-search-icon" />
          <input type="text" placeholder="Tìm Kiếm" />
        </div>
        <div className="month">
          <h4>{`${selectedMonth + 1}/${selectedYear}`}</h4>
          <FontAwesomeIcon
            icon="chevron-circle-left"
            className="chevron-circle-left-icon"
          />
          <FontAwesomeIcon
            icon="chevron-circle-right"
            className="chevron-circle-right-icon"
          />
        </div>
      </div>
      <div className="dates-container">
        <IconButton
          className="dates-container__icon"
          onClick={() => {
            updateDates(
              -7,
              setBeginDay,
              setSelected,
              now,
              beginDay,
              dates,
              setSelectedMonth,
              setSelectedYear,
              selectedMonth,
              selectedYear
            );
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          className="dates-container__icon"
          onClick={() => {
            updateDates(
              7,
              setBeginDay,
              setSelected,
              now,
              beginDay,
              dates,
              setSelectedMonth,
              setSelectedYear,
              selectedMonth,
              selectedYear
            );
          }}
        >
          <ArrowForwardIos />
        </IconButton>
        <div className="dates">
          {dates.map((date, index) => (
            <div
              key={index}
              className={
                (now.getFullYear() === date.getFullYear() &&
                now.getMonth() === date.getMonth() &&
                now.getDate() === date.getDate()
                  ? "date--today"
                  : "date") +
                (Math.random() > 0.5 ? " dot-notify" : "") +
                (selected === index ? " date--active" : "")
              }
              onClick={() => setSelected(index)}
            >
              <p>{dateMap.get(date.getDay())}</p>
              <p>
                {date.getMonth() !== selectedMonth
                  ? `${date.getDate()}/${date.getMonth() + 1}`
                  : date.getDate()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="appointment-container">
        {/* <Scrollbars style={{ width: '100%', height: 350 }}> */}
        {data.map((appointment) => (
          <div className="appointment">
            <div className="appointment-header">
              <h4>{appointment.time}</h4>
              <p>{appointment.type}</p>
            </div>
            <div className="appointment-body">
              <div>
                <h4>{appointment.name}</h4>
                <p>{appointment.doctor}</p>
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
