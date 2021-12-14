import React, { useState } from "react";
import { RightBar } from "_components/StyledComponent";
import { Button } from "@mui/material";
import { SwapVert, ArrowBackIosNew, Alarm } from "@mui/icons-material";
import "./index.scss";
// import PropTypes from 'prop-types'

const QueueItem = ({ avatar, pname, pnum, cid, state, current }) => {
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
          <div style={{fontSize: '16px'}}>
            <Alarm sx={{fontSize: '16px', transform: 'translateY(1.8px)'}}/> 07:15
          </div>
          <Button
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

function RightBarContent(props) {
  const [selected, setSelected] = useState(1);
  return (
    <RightBar className="RBDoctorHome">
      <h4>Hàng đợi</h4>
      <QueueItem
        avatar="TB"
        pname="Trương Quốc Bảo"
        cid="123456"
        pnum="01"
        current={true}
      />
      <Button
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
        {Array.from(new Array(4)).map((item) => (
          <QueueItem
            avatar="TB"
            pname="Trương Quốc Bảo"
            cid="18520501"
            pnum="01"
          />
        ))}
      </div>
    </RightBar>
  );
}

RightBarContent.propTypes = {};

export default RightBarContent;
