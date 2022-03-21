import React from "react";
import { Badge, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import "./index.scss";
// import PropTypes from 'prop-types'

function Notification(props) {
  return (
    <IconButton className="notification" sx={{marginRight: 2}}>
      <Badge variant="dot" color="warning">
        <Notifications fontSize="2" className="notification__icon" />
      </Badge>
    </IconButton>
  );
}

Notification.propTypes = {};

export default Notification;
