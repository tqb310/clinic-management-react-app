import React from "react";
// import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Box} from '@mui/material';
import "./index.scss";

function DateTime(props) {
  return (
    <div>
      <Box>
        <FontAwesomeIcon icon="calendar-week" />
        <span>10/28/2021</span>
      </Box>
      <Box>
        <FontAwesomeIcon icon="clock" />
        <span>11:26:12 AM</span>
      </Box>
    </div>
  );
}

DateTime.propTypes = {};

export default DateTime;
