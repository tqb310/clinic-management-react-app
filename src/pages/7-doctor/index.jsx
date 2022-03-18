import React, { useState, useEffect } from "react";
import authentication from "_services/authentication.service";
import { CustomPaper } from "_components/shared/StyledComponent";
import Appointment from "./_components/Appointment";
import RecentPatient from "./_components/RecentPatient";
import ExamineCard from "./_components/ExamineCard";
import RightBarContent from "./_components/RightBar";
import { data as fakeData } from '_constants/FakeData/Diagnostic'
import { dateTimeNow } from '_constants/date'
import socket from '_services/socket.io'
// import diagnosticService from '_services/diagnostic.service'
import diagnostic from "_services/diagnostic.service";
import "./index.scss";
// import PropTypes from 'prop-types'

function Dashboard(props) {
  const [room, setRoom] = useState(1)
  const [queue, setQueue] = useState([])
  const [continuous, setContinuous] = useState(false)
  // socket.on('diagnostic-stack-change', (stack) => {
  //   if(room == 1){
  //     setQueue(stack.room1)
  //   }
  //   else{
  //     setQueue(stack.room2)
  //   }
  // })
  const start = (pnum) => {
    // socket.emit('start', { room, pnum })
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     diagnostic.getRoom()
  //       .then((roomData) => {
  //         setRoom(roomData.room)
  //         setQueue(roomData.QUEUE)
  //       })
  //   }
  //   fetchData()
  // }, [])
  //Cập nhật phiếu khám bên module bác sĩ

  const handleSubmitFinal = async (data) => {
    console.log(data);
    console.log(queue[0].diagnostic.DIAGNOSTIC_ID)
    await diagnostic.updateDiagnostic({
      room: room,
      pnum:queue[0].order,
      id: queue[0].diagnostic.DIAGNOSTIC_ID,
      SYMPTOM: data.SYMPTOM,
      DIAGNOSTIC: data.DIAGNOSTIC,
      APPOINTMENT_DATE: data.APPOINTMENT_DATE,
      BLOOD_PRESSURE: data.BLOOD_PRESSURE,
      PULSE: data.PULSE,
      TEMPERATURE: data.TEMPERATURE,
      PRESCRIPTION: data.PRESCRIPTION,
      CREATE_AT: dateTimeNow()
    })
  }
  return (
    <div className="DoctorDashboard">
      <div className="DoctorDashboard__header">
        <p className="DoctorDashboard__title">
          Xin chào{", "}
          <span>{authentication.getCurrentUser()?.payload.employee_name}</span>
        </p>
        <CustomPaper className="DoctorDashboard__room">
          Phòng khám {room}
        </CustomPaper>
      </div>
      <div className="DoctorDashboard__content">
        <div className="DoctorDashboard__appointment">
          <Appointment />
        </div>
        <div className="DoctorDashBoard__examineCard">
          <ExamineCard data={(queue.length > 0 && continuous) ? queue[0] : JSON.parse(fakeData)} continuous={continuous} handleSubmitFinal={handleSubmitFinal} />
        </div>
        <div className="DoctorDashBoard__recentPatient">
          <RecentPatient />
        </div>
      </div>
      <RightBarContent queue={queue} continuous={continuous} handleContinuous={setContinuous} start={start} />
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
