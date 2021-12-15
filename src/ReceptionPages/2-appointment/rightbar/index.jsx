import React, { useState, useEffect } from "react";
import { RightBar } from "_components/StyledComponent";
// import {data} from "_constants/FakeData/AppointmentRequest";
import appointment from "_services/appointment.service";
import {today} from '_constants/date';
import ConfirmRequest from '../ConfirmRequest';
import "./index.scss";


function RequestContent({ data, onClick }) {
  const timeParse = (dateTime) => {
    const milisecond = today - (new Date(dateTime.slice(0, 22)).getTime())
    const hour = (milisecond - (milisecond % 3600000)) / 3600000
    const min = Math.floor((milisecond % 3600000) / 60000)
    return ((hour > 0) ? `${hour} giờ ` : '') + ((min > 0) ? `${min} phút trước` : 'trước')
  }
  return (
    <table className="appoinment-rightbar-content">
      {data.map((d) => (
        <tr className={d.STATUS === 1 ? "unread" : ""} onClick={() => onClick(d)}>
          <td>{timeParse(d.CREATE_AT)}</td>
          <td>
            <p>{d.PATIENT_NAME}</p>
            <p>{d.PHONE}</p>
          </td>
        </tr>
      ))}
    </table>
  );
}

function AppointmentDemand() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    async function fetchData() {
      const dataApi = await appointment.getAllAppointmentRequest()
      switch (dataApi) {
        case undefined: break;
        case null: alert('Chưa đăng nhập, vui lòng đăng nhập'); break;
        default: setData(dataApi)
      }
    }
    fetchData();
  }, []);
  const dataToday = data.filter(d => (new Date(d.CREATE_AT.slice(0, 22))).getDate() === (new Date(Date.now()).getDate()))
  const oldData = data.filter(d => (new Date(d.CREATE_AT.slice(0, 22))).getDate() !== (new Date(Date.now()).getDate()))
  return (
    <RightBar>
      <div className="appointment-demand-header">
        <p>Yêu cầu đặt lịch hẹn</p>
      </div>
      <p className="appointment__timenote">Mới nhất ({dataToday.length})</p>
      <RequestContent data={dataToday} onClick={(data) => setOpen(data)}/>
      <p className="appointment__timenote">Trước đó ({oldData.length})</p>
      <RequestContent data={oldData} onClick={() => setOpen(true)}/>
      <ConfirmRequest open={open} handleClose={handleClose}/>
    </RightBar>
  );
}

export default AppointmentDemand;
