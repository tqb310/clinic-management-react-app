import React from "react";
import "./index.scss";
import lich from "./assets/lich.jpg";
import huylich from "./assets/huylich.png";
import {CustomPaper} from "_components/shared/StyledComponent";

function infomation() {
  return (
    <div className="container">
      <div className="card-wrapper">
        <CustomPaper className="card">
          <img src={lich} alt="lich-logo" width={56} height={60} />

          <div className="text-wrapper">
            <h4 className="greendark">51</h4>
            <h5>Sắp tới</h5>
          </div>
        </CustomPaper>
        <CustomPaper className="card">
          <img src={huylich} alt="lich-huy-logo" width={56} height={56} />

          <div className="text-wrapper">
            <h4 className="reddark">7</h4>
            <h5>Đã hủy</h5>
          </div>
        </CustomPaper>
      </div>
    </div>
  );
}

export default infomation;
