import React from "react";
import { Box, Badge, IconButton } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import {CustomPaper} from '_components/StyledComponent/Paper.js';
import "./index.scss";
// import PropTypes from 'prop-types'
// const {CustomPaper} = cs;
function Profile(props) {
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
        <Box className="profile__avatar">Đ</Box>
      </Badge>
      <Box className="profile__name">Nguyễn Văn A</Box>
      <Box>
        <IconButton sx={{width: 20, height: 20}}>
          <ArrowDropDown />
        </IconButton>
      </Box>
    </CustomPaper>
  );
}

Profile.propTypes = {};

export default Profile;
