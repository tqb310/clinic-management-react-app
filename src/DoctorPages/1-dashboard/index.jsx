import React from "react";
import authentication from "_services/authentication.service";
import {CustomPaper} from "_components/StyledComponent";
import Appointment from "./_components/Appointment";
import RecentPatient from "./_components/RecentPatient";
import ExamineCard from "./_components/ExamineCard";
import RightBarContent from "./_components/RightBar";
import "./index.scss";
// import PropTypes from 'prop-types'

function Dashboard(props) {

  //Cập nhật phiếu khám bên module bác sĩ

  const handleSubmitFinal = (data) => {
    console.log(data);
  }
  return (
    <div className="DoctorDashboard">
      <div className="DoctorDashboard__header">
        <p className="DoctorDashboard__title">
          Xin chào{", "}
          <span>{authentication.getCurrentUser()?.payload.employee_name}</span>
        </p>
        <CustomPaper className="DoctorDashboard__room">
            Phòng khám 1
        </CustomPaper>
      </div>
      <div className="DoctorDashboard__content">
        <div className="DoctorDashboard__appointment">
          <Appointment/>
        </div>
        <div className="DoctorDashBoard__examineCard">
          <ExamineCard handleSubmitFinal={handleSubmitFinal}/>
        </div>
        <div className="DoctorDashBoard__recentPatient">
          <RecentPatient/>
        </div>
      </div>
      <RightBarContent/>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
