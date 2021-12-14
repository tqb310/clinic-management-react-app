import React, { useState } from "react";
// import PropTypes from 'prop-types'
import { Box, Button, InputBase } from "@mui/material";
import { Search, FilterAlt } from "@mui/icons-material";
import { CustomPaper } from "_components/StyledComponent";
import "./index.scss";

function TabTableWrapper({ tabNameArr, children, ...rest }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const onClickItem = (index) => {
    return () => setSelectedItem(index);
  };
  return (
    <CustomPaper className="TabTableWrapper" {...rest}>
      <Box className="TabTableWrapper__tablabel">
        {tabNameArr.map((item, index) => (
          <Box
            key={index}
            className={`TabTableWrapper__tabItem ${
              selectedItem === index ? "active" : ""
            }`}
            onClick={onClickItem(index)}
          >
            {item.title}
            <span className="TabTableWrapper__tabItemBadge">{item.number}</span>
          </Box>
        ))}
      </Box>
      <Box className="TabTableWrapper__actions">
        <Box className="TabTableWrapper__search">
          <Search className="icon" />
          <InputBase
            className="input"
            placeholder="Số thứ tự, tên, số điện thoại ..."
          />
        </Box>
        <Button
          sx={{ color: "#52575C", textTransform: "none", fontWeight: 400 }}
          endIcon={<FilterAlt sx={{ color: "#2E3192" }} />}
        >
          Lọc
        </Button>
      </Box>
      <Box className="TabTableWrapper__table">
        {children && children(selectedItem)}
      </Box>
    </CustomPaper>
  );
}

TabTableWrapper.propTypes = {};

export default TabTableWrapper;
