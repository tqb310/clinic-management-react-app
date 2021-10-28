import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import "./index.scss";

function DateTime() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  
  useEffect(() => {
    getDateTime(setTime, setDate);
  }, []);

  return (
    <Box className="datetime">
      <Box className="date">
        <FontAwesomeIcon className="date__icon" icon="calendar-week" />
        <Typography component="span" className="date__data">{date}</Typography>
      </Box>
      <Box>
        <FontAwesomeIcon className="time__icon" icon="clock" />
        <Typography component="span" className="time__data">{time}</Typography>
      </Box>
    </Box>
  );
}

const getDateTime = (setTime, setDate) => {
    setInterval(() => {
        let date = new Date();
        setTime(date.toLocaleTimeString());
        setDate(`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`);
      }, 1000);
}


export default DateTime;
