import React from "react";
import './index.scss';
// import { Scrollbars } from "react-custom-scrollbars-2";
// import {RightBar} from '_components/StyledComponent/RightBar';
// import PropTypes from 'prop-types'

function Dashboard(props) {  
  return (
    <div className="dashboard">
      <p className="dashboard__title">Xin chào, <span>Nguyễn Văn A</span></p>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
