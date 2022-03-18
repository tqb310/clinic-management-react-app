import React from "react";
import DateTime from "./_components/DateTime";
import SearchHeader from "./_components/Search";
import Notification from "./_components/Notification";
import Profile from "./_components/Profile";
import { Box } from "@mui/material";
// import PropTypes from "prop-types";
import "./index.scss";

function Header({ isShow }) {
  return (
    <Box className="header">
      <Box className="header__datetime">
        <DateTime />
      </Box>
      <Box className="header__actions">
        <SearchHeader />
        <Box>
          <Profile />
          <Notification />
        </Box>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  
};

export default Header;
