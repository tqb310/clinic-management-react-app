import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Tooltip } from "@mui/material";
import "./index.scss";

const iconStyles = {
  color: "#A0A4A8",
  fontSize: 30,
  transition: "all .3s",
  display: "block",
  margin: "auto",
  padding: 0.5,
  "&:hover": {
    transform: "scale(1.5,1.5)",
  },
};

const activeIconStyles = {
  ...iconStyles,  
  color: "white",
  backgroundColor: "#2E3192",
  transform: "scale(1.2,1.2)",
  boxShadow: "0px 4px 20px #2E3192",
  borderRadius: 2,
  "&:hover": {},
};

function SideBar({ routes }) {
  const { path } = useRouteMatch();
  // console.log(path);
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <ul className="sidebar">
        {routes.map((route, index) => {
          const { id, path: childPath, name, icon: Icon } = route;
          return (
            <li key={id} className="sidebar__item">
              <Tooltip title={name} followCursor arrow>
                <NavLink
                  style={{ display: "block", padding: "20px 10px" }}
                  to={`${path + childPath}`}
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
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      public: PropTypes.bool,
      exact: PropTypes.bool,
      component: PropTypes.object,
      icon: PropTypes.object,
    })
  ),
};

export default SideBar;
