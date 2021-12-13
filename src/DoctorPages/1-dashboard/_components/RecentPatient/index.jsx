import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { CustomPaper } from "_components/StyledComponent";
import { FiberManualRecord } from "@mui/icons-material";
import "./index.scss";
// import PropTypes from 'prop-types'

const RecentPatientItem = () => {
  return (
    <div className="RecentPatientItem">
      <div className="RecentPatientItem__avatar">
        <div className="RecentPatientItem__avatarInner">TB</div>
      </div>
      <div className="RecentPatientItem__patient">
        <div>Trương Quốc Bảo</div>
        <div>
          Hôm nay <FiberManualRecord sx={{fontSize: 9, color: '#888'}}/> 07:34
        </div>
      </div>
      <div className="RecentPatientItem__state">Hoàn tất</div>
    </div>
  );
};

function Examining(props) {
  return (
    <CustomPaper className="DTRecentPatient">
      <div className="DTRecentPatient__header">Bệnh nhân gần đây</div>
      <Scrollbars style={{ width: "100%", height: "100%" }} autoHide={true}>
        <div className="DTRecentPatient__content">
          <RecentPatientItem />
          <RecentPatientItem />
          <RecentPatientItem />
          <RecentPatientItem />
          <RecentPatientItem />
          <RecentPatientItem />
        </div>
      </Scrollbars>
    </CustomPaper>
  );
}

Examining.propTypes = {};

export default Examining;
