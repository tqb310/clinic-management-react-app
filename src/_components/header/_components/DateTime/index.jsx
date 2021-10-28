import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import "./index.scss";

function DateTime(props) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  
  useEffect(() => {
    getDateTime(setTime, setDate);
  }, []);

  return (
    <Box className="datetime">
      <Box className="date">
        <FontAwesomeIcon className="date__icon" icon="calendar-week" />
        <span className="date__data">{date}</span>
      </Box>
      <Box>
        <FontAwesomeIcon className="time__icon" icon="clock" />
        <span className="time__data">{time}</span>
      </Box>
    </Box>
  );
}

const getDateTime = (setTime, setDate) => {
    setInterval(() => {
        let date = new Date();
        setTime(date.toLocaleTimeString());
        setDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }, 1000);
}

DateTime.propTypes = {};

export default DateTime;
