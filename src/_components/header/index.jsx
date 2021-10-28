import React from "react";
import DateTime from "./_components/DateTime";
import SearchHeader from "./_components/Search";
import Notification from "./_components/Notification";
import { Box } from "@mui/material";
//import PropTypes from 'prop-types'
import "./index.scss";

function Header(props) {
  return (
    <Box>
      <DateTime />
      <Box>
        <SearchHeader />
        <Notification />
      </Box>
    </Box>
  );
}

Header.propTypes = {};

export default Header;
