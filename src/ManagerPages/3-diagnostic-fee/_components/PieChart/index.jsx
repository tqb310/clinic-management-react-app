import React from "react";
import { CustomPaper } from "_components/StyledComponent";
import "./index.scss";
// import PropTypes from 'prop-types';

function PieChart(props) {
  return (
    <CustomPaper className="PieChart">
      <p className="PieChart__title">Tỉ lệ Sử dụng dịch vụ</p>
      <div className="PieChart__container">
        <div className="PieChart__layer"></div>
        <div className="PieChart__layer"></div>
        <div className="PieChart__layer"></div>
        <div className="PieChart__layer"></div>
      </div>
      <div className="PieChart__note">
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "steelblue" }}
          >27%</div>
          Siêu âm
        </div>
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "coral" }}
          >10%</div>
          Chụp X-Quang
        </div>
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "cadetblue" }}
          >52%</div>
          Xét nghiệm máu
        </div>
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "burlywood" }}
          >11%</div>
          Khám sức khỏe
        </div>
      </div>
    </CustomPaper>
  );
}

PieChart.propTypes = {};

export default PieChart;
