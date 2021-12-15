import React from "react";
import { Box, Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { CustomPaper } from "_components/StyledComponent/Paper.js";
import authentication from "_services/authentication.service";
import ProfileForm from '../ProfileForm';
import PasswordForm from '../PasswordForm';
import "./index.scss";
// import PropTypes from 'prop-types'
// const {CustomPaper} = cs;

function Profile(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleCloseForm = () => {
    setOpenPass(false);
    setOpenProfile(false);
  };
  const handleMenuItemClick = (num) => {
    handleClose();
    if (num) setOpenPass(true);
    else setOpenProfile(true);
  };
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
        <Box className="profile__avatar">
          {authentication.getCurrentUser()?.payload.employee_name.slice(0, 1)}
        </Box>
      </Badge>
      <Box className="profile__name">
        {authentication.getCurrentUser()?.payload.employee_name}
      </Box>
      <Box>
        <IconButton sx={{ width: 20, height: 20 }} onClick={handleClick}>
          <KeyboardArrowDown style={{ color: "#2E3192" }} />
        </IconButton>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(0)}>
          Thông tin cá nhân
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(1)}>
          Cập nhật mật khẩu
        </MenuItem>
      </Menu>
      <ProfileForm open={openProfile} handleClose={handleCloseForm} />
      <PasswordForm open={openPass} handleClose={handleCloseForm} />
    </CustomPaper>
  );
}

Profile.propTypes = {};

export default Profile;
