import React, { memo, useContext } from "react";
import { Typography, Divider } from "@mui/material";
import DateTime from "./_components/DateTime";
// import SearchHeader from "./_components/Search";
import { useLocation } from "react-router-dom";
import Notification from "./_components/Notification";
import Profile from "./_components/Profile";
import { Box } from "@mui/material";
import Routes from 'pages/_routes';
// import PropTypes from "prop-types";
import "./index.scss";

function Header() {
  const { pathname } = useLocation();
  // console.log('HEADER re-render');
  const pname = Routes.find(route => route.path === pathname)?.name || '';
  return (
    <Box className="header">
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700, flex: 1 }}>
        {pname}
      </Typography>
      <DateTime />
      <Box className="header__actions">
        <Notification />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Profile />
      </Box>
    </Box>
  );
}

Header.propTypes = {};

export default memo(Header);
