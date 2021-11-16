import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Route, Switch, Redirect } from "react-router-dom";
import SideBar from "_components/sidebar";
import Header from "_components/header";
import { Scrollbars } from "react-custom-scrollbars-2";
import ClinicLogo from "_assets/images/clinic.png";
import "./index.scss";


function PageWrapper({ routes, currentPath }) {
 
  return (
    <Box className="pagewrapper">
      <Box className="pagewrapper__left">
        <img className="pagewrapper__logo" src={ClinicLogo} alt="Clinic logo" width="56" height="56"/>
        <SideBar routes={routes} />
      </Box>
      <Box className="pagewrapper__center">
        <Box className="pagewrapper__header">
          <Header />
        </Box>
        <Box className="pagewrapper__main">
          <Scrollbars
            // style={{ width: "100%", height: "100%"}}
            // autoHide
            // autoHideTimeout={1000}
            // autoHideDuration={500}
          >
            <Suspense fallback={<div>Loading ...</div>}>
              <Switch>
                {routes.map(({ id, path: childPath, exact, component }) => {
                  return (
                    <Route
                      key={id}
                      path={`${currentPath + childPath}`}
                      exact={exact}
                      component={component}
                    />
                  );
                })}
                <Route
                  render={() => <Redirect to={currentPath + "/trang-chu"} />}
                />
              </Switch>
            </Suspense>
          </Scrollbars>
        </Box>
      </Box>
      <Box className="pagewrapper__right"></Box>
    </Box>
  );
}

PageWrapper.propTypes = {
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
  currentPath: PropTypes.string,
};

export default PageWrapper;
