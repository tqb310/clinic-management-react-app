import React, { useState } from "react";
import { RightBar } from "_components/shared/StyledComponent";
import { Button } from "@mui/material";
import { SwapVert, ArrowBackIosNew, Alarm } from "@mui/icons-material";
import socket from '_services/socket.io'
import "./index.scss";
// import PropTypes from 'prop-types'

const QueueItem = ({ avatar, pname, pnum, cid, state, current, start }) => {
  return (
    <div className="RBDoctorHome__queueItem">
      <div style={{ display: "flex", alignItems: "center" }}>
        {current && <ArrowBackIosNew></ArrowBackIosNew>}
        <div className="RBDoctorHome__avatar">
          <div className="RBDoctorHome__avatarInner">{avatar}</div>
        </div>
        <div className="RBDoctorHome__patient">
          <p>#{cid}</p>
          <p>{pname}</p>
        </div>
        <div className="RBDoctorHome__orderNum">
          <div className="RBDoctorHome__orderNumInner">{pnum}</div>
        </div>
      </div>
      {current && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '0 1rem'
          }}
        >
          <div style={{ fontSize: '16px' }}>
            <Alarm sx={{ fontSize: '16px', transform: 'translateY(1.8px)' }} /> 07:15
          </div>
          <Button
            onClick={()=>start(pnum)}
            variant="outlined"
            color="success"
            sx={{ fontSize: 12, marginTop: "5px" }}
          >
            Bắt đầu
          </Button>
        </div>
      )}
    </div>
  );
};

function RightBarContent({ queue, continuous, handleContinuous, start }) {
  const [selected, setSelected] = useState(1);
  console.log(queue)
  const createAvatar = (name) => {
    return name.split(' ').map(data => data[0]).join("")
  }
  return (
    <RightBar className="RBDoctorHome">
      <h4>Hàng đợi</h4>
      {(queue.length > 0) && <div>
        {continuous && <QueueItem
          avatar={createAvatar(queue[0].diagnostic.PATIENT.PATIENT_NAME)}
          pname={queue[0].diagnostic.PATIENT.PATIENT_NAME}
          cid={queue[0].diagnostic.DIAGNOSTIC_ID}
          pnum={queue[0].order}
          current={true}
          start={start}
        />}
        <Button
          onClick={()=>handleContinuous(true)}
          variant="outlined"
          startIcon={<SwapVert sx={{ color: "white" }} />}
          sx={{
            borderWidth: "2px",
            marginTop: ".8rem",
            borderColor: "#F5F8FE",
            color: "#F5F8FE",
            fontSize: "12px",
            // backgroundColor: "#EFAD0A",
            "&:hover": {
              borderWidth: "2px",
              borderColor: "#F5F8FE",
              opacity: 0.8,
            },
          }}
        >
          Tiếp tục
        </Button>
        <div className="RBDoctorHome__queueTab">
          <div className={selected === 1 ? "active" : ""}>
            Đang chờ <span>20</span>
          </div>
          <div className={selected === 2 ? "active" : ""}>
            Dịch vụ <span>20</span>
          </div>
          <div className={selected === 1 ? "active" : ""}>
            Đang chờ <span>20</span>
          </div>
        </div>
        <div className="RBDoctorHome__queueList">
          {queue.slice((continuous ? 1 : 0)).map((item) => (
            <QueueItem
              avatar={createAvatar(item.diagnostic.PATIENT.PATIENT_NAME)}
              pname={item.diagnostic.PATIENT.PATIENT_NAME}
              cid={item.diagnostic.DIAGNOSTIC_ID}
              pnum={item.order}
            />
          ))}
        </div>
      </div>}
    </RightBar>
  );
}

RightBarContent.propTypes = {};

export default RightBarContent;
