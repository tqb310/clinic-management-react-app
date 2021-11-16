import React from "react";
import { RightBar } from "_components/StyledComponent";
import {data} from "_constants/FakeData/AppointmentRequest";
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
  return (
    <RightBar>
      <div className="appointment-demand-header">
        <p>Yêu cầu đặt lịch hẹn</p>
      </div>
      <p className="appointment__timenote">Mới nhất (4)</p>    
      <RequestContent data={data.slice(0, 4)}/>
      <p className="appointment__timenote">Trước đó (4)</p>
      <RequestContent data={data.slice(4)}/>
    </RightBar>
  );
}

export default AppointmentDemand;
