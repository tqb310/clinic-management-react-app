import React from "react";
import { CustomPaper } from "_components/StyledComponent";
import "./index.scss";
// import PropTypes from 'prop-types';

function PieChart(props) {
  return (
    <CustomPaper className="PieChart">
      <p className="PieChart__title">Tỉ lệ số cuộc hẹn theo khung giờ</p>
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
          7h - 9h
        </div>
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "coral" }}
          >10%</div>
          9h - 11h
        </div>
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "cadetblue" }}
          >52%</div>
          13h - 15h
        </div>
        <div className="PieChart__notestate">
          <div
            className="colorstate"
            style={{ backgroundColor: "burlywood" }}
          >11%</div>
          15h - 17h
        </div>
      </div>
    </CustomPaper>
  );
}

PieChart.propTypes = {};

export default PieChart;
