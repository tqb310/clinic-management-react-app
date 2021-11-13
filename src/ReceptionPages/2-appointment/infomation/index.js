import React from "react";
import "./index.scss";
import lich from "ReceptionPages/2-appointment/infomation/assets/lich.jpg";
import huylich from "ReceptionPages/2-appointment/infomation/assets/huylich.png";

function infomation() {
  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="card">
          <img src={lich} alt="lich-logo" width={56} height={60} />

          <div className="text-wrapper">
            <h4 className="greendark">51</h4>
            <h5>Tổng số cuộc hẹn</h5>
          </div>
        </div>
        <div className="card">
          <img src={huylich} alt="lich-huy-logo" width={56} height={56} />

          <div className="text-wrapper">
            <h4 className="reddark">7</h4>
            <h5>Số cuộc hẹn đã hủy</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default infomation;
