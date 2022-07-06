import React from "react";
import { CustomPaper } from "_components/shared/StyledComponent";
import { KeyboardArrowDown } from "@mui/icons-material";
import {Button} from "@mui/material";
import "./index.scss";
// import PropTypes from "prop-types";
const data = [
  { day: "Thg 1", number: 9 },
  { day: "Thg 2", number: 12 },
  { day: "Thg 3", number: 4 },
  { day: "Thg 4", number: 7 },
  { day: "Thg 5", number: 11 },
  { day: "Thg 6", number: 21 },
  { day: "Thg 7", number: 17 },
  { day: "Thg 8", number: 4 },
  { day: "Thg 9", number: 7 },
  { day: "Thg 10", number: 11 },
  { day: "Thg 11", number: 21 },
  { day: "Thg 12", number: 17 },
];
const max = data.reduce((a, b) => (a > b.number ? a : b.number), 0);

function VisitChart(props) {
  return (
    <CustomPaper className="VisitChart">
      <div className="VisitChart__header">
        <p>Số lượng bệnh nhân mỗi tháng</p>
        <span>
          <Button
            sx={{
              color: "#25282B",
              textTransform: "capitalize",
              padding: 0,
              fontSize: 13,
              textAlign: "center",
            }}
            endIcon={<KeyboardArrowDown style={{ color: "#2E3192" }} />}
          >
            Năm nay
          </Button>
        </span>
      </div>
      <div className="VisitChart__frame">
        <table>
          <tr>
            <td>20+</td>
            <td>
              <div className="VisitChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>15</td>
            <td>
              <div className="VisitChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>
              <div className="VisitChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <div className="VisitChart__dotline"></div>
            </td>
          </tr>
          <tr>
            <td>0</td>
            <td>
              <div className="VisitChart__dotline"></div>
            </td>
          </tr>
        </table>
      </div>
      <div className="VisitChart__content">
        {data.map((item, index) => (
          <div
            key={index}
            className="VisitChart__item"
            style={{ left: 52 + index * 51.5 }}
          >
            <div
              className={`VisitChart__baritem + ${
                item.number === max ? " max" : ""
              }`}
              style={{ height: Math.min(141, item.number * 7.05) }}
            >
              {item.number}
            </div>
            <div className="VisitChart__worditem">{item.day}</div>
          </div>
        ))}
      </div>
    </CustomPaper>
  );
}

VisitChart.propTypes = {};

export default VisitChart;
