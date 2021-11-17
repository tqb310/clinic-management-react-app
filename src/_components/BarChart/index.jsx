import React from "react";
import { Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import "./index.scss";
// import PropTypes from 'prop-types'

const data = [
  { day: "Hai", number: 9 },
  { day: "Ba", number: 12 },
  { day: "Tư", number: 4 },
  { day: "Năm", number: 7 },
  { day: "Sáu", number: 11 },
  { day: "Bảy", number: 21 },
  { day: "CN", number: 17 },
];
const max = data.reduce((a, b) => (a > b.number ? a : b.number), 0);

function BarChart(props) {
  return (
    <div className="BarChart">
      <div className="BarChart__header">
        <h4>Số cuộc hẹn trong tuần</h4>
        <span>
          <Button
            sx={{ color: "#25282B", textTransform: "capitalize", padding: 0, fontSize: 13, textAlign: 'center' }}
            endIcon={<KeyboardArrowDown style={{ color: "#2E3192" }} />}
          >
            Tuần này
          </Button>
        </span>
      </div>
      <div className="BarChart__frame">
        <table>
          <tr>
            <td>20+</td>
            <td>
              <div className="BarChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>15</td>
            <td>
              <div className="BarChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>
              <div className="BarChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <div className="BarChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>0</td>
            <td>
              <div className="BarChart__dotline"></div>
            </td>
          </tr>
        </table>
      </div>
      <div className="BarChart__content">
        {data.map((item, index) => (
          <div
            key={index}
            className="BarChart__item"
            style={{ left: 40 + index * 50 }}
          >
            <div
              className={`BarChart__baritem + ${
                item.number === max ? " max" : ""
              }`}
              style={{ height: Math.min(150, item.number * 7.5) }}
            >
              {item.number}
            </div>
            <div className="BarChart__worditem">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

BarChart.propTypes = {};

export default BarChart;
