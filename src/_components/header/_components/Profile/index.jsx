import React from "react";
import { Box, Badge, IconButton } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import {CustomPaper} from '_components/StyledComponent/Paper.js';
import authentication from '_services/authentication.service';
import "./index.scss";
// import PropTypes from 'prop-types'
// const {CustomPaper} = cs;

function Profile(props) {
  console.log(authentication.getCurrentUser());
  return (
    <CustomPaper className="profile">
      <Badge
        variant="dot"
        color="success"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
      >
        <Box className="profile__avatar">{authentication.getCurrentUser()?.payload.employee_name.slice(0,1)}</Box>
      </Badge>
      <Box className="profile__name">{authentication.getCurrentUser()?.payload.employee_name}</Box>
      <Box>
        <IconButton sx={{width: 20, height: 20}}>
          <KeyboardArrowDown style={{color: '#2E3192'}}/>
        </IconButton>
      </Box>
    </CustomPaper>
  );
}

Profile.propTypes = {};

export default Profile;
