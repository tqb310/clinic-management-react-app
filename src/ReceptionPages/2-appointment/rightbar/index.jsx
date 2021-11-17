import React, { useState, useEffect } from "react";
import { RightBar } from "_components/StyledComponent";
// import {data} from "_constants/FakeData/AppointmentRequest";
import appointment from "_services/appointment.service";
import {today} from '_constants/date'
import "./index.scss";


function RequestContent({ data }) {
  const timeParse = (dateTime) => {
    const milisecond = today - (new Date(dateTime.slice(0, 22)).getTime())
    const hour = (milisecond - (milisecond % 3600000)) / 3600000
    const min = Math.floor((milisecond % 3600000) / 60000)
    return ((hour > 0) ? `${hour} giờ ` : '') + ((min > 0) ? `${min} phút trước` : 'trước')
  }
  return (
    <table className="appoinment-rightbar-content">
      {data.map((d) => (
        <tr className={d.STATUS == 1 ? "unread" : ""}>
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
  useEffect(() => {
    async function fetchData() {
      const dataApi = await appointment.getAllAppointmentRequest()
      switch (dataApi) {
        case undefined: alert('Lỗi server, vui lòng thử lại'); break;
        case null: alert('Chưa đăng nhập, vui lòng đăng nhập'); break;
        default: setData(dataApi)
      }
    }
    fetchData()

  })
  const dataToday = data.filter(d => (new Date(d.CREATE_AT.slice(0, 22))).getDate() == (new Date(Date.now()).getDate()))
  const oldData = data.filter(d => (new Date(d.CREATE_AT.slice(0, 22))).getDate() != (new Date(Date.now()).getDate()))
  return (
    <RightBar>
      <div className="appointment-demand-header">
        <p>Yêu cầu đặt lịch hẹn</p>
      </div>
      <p className="appointment__timenote">Mới nhất ({dataToday.length})</p>
      <RequestContent data={dataToday} />
      <p className="appointment__timenote">Trước đó ({oldData.length})</p>
      <RequestContent data={oldData} />
    </RightBar>
  );
}

export default AppointmentDemand;
