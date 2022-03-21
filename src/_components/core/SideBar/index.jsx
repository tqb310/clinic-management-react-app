import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import "./index.scss";

const iconStyles = {
  color: "#A0A4A8",
  fontSize: 32,
  transition: "all .3s",
  display: "block",
  margin: "auto",
  padding: 0.5,
  "&:hover": {
    transform: "scale(1.2,1.2)",
  },
};

const activeIconStyles = {
  ...iconStyles,  
  color: "white",
  backgroundColor: "#2E3192", 
  borderRadius: 2,
  "&:hover": {},
};

function SideBar({ routes }) { 
  // console.log(path);
  const [selectedTab, setSelectedTab] = useState(0);
  return (    
      <nav className="sidebar">
        {routes.map((route, index) => {
          const { id, path, name, icon: Icon } = route;
          return (
            <li key={id} className="sidebar__item">
              <Tooltip title={name} followCursor arrow>
                <NavLink
                  style={{ display: "block", padding: "15px 0" }}
                  to={path}
                  isActive={(match, location) => {
                    if (match) {
                      setSelectedTab(index);
                    }
                  }}                  
                >
                  <Icon
                    sx={selectedTab === index ? activeIconStyles : iconStyles}
                  />
                </NavLink>
              </Tooltip>
            </li>
          );
        })}
      </nav>    
  );
}

SideBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      isPublic: PropTypes.bool,
      exact: PropTypes.bool,
      component: PropTypes.object,
      icon: PropTypes.object,
    })
  ),
};

export default memo(SideBar);
