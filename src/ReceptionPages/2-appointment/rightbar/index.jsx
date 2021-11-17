import React, {useState, useEffect } from "react";
import { RightBar } from "_components/StyledComponent";
import {data} from "_constants/FakeData/AppointmentRequest";
import appointment from "_services/appointment.service";
import "./index.scss";

function RequestContent({data}) {
  return (
    <table className="appoinment-rightbar-content">
      {data.map((data) => (
        <tr className={Math.random() > 0.5 ? "unread" : ""}>
          <td>{data.createAt}</td>
          <td>
            <p>{data.name}</p>
            <p>{data.phone}</p>
          </td>
        </tr>
      ))}
    </table>
  );
}

function AppointmentDemand() {
  const [data1, setData] = useState([])
  useEffect(() => {
    async function fetchData(){
      const dataApi = await appointment.getAllAppointmentRequest()
      switch(dataApi){
        case undefined:alert('Lỗi server, vui lòng thử lại');break;
        case null:alert('Chưa đăng nhập, vui lòng đăng nhập');break;
        default:setData(dataApi)
      }
    }
    fetchData()
    console.log(data1)
  }, [])
  return (
    <RightBar>
      <div className="appointment-demand-header">
        <p>Yêu cầu đặt lịch hẹn</p>
      </div>
      <p className="appointment__timenote">Mới nhất</p>    
      <RequestContent data={data.slice(0, 4)}/>
      <p className="appointment__timenote">Trước đó</p>
      <RequestContent data={data.slice(4)}/>
    </RightBar>
  );
}

export default AppointmentDemand;
