import React from "react";
import { TextField } from "@mui/material";
// import {CustomPaper} from '_components/StyledComponent';
import "./index.scss";
// import PropTypes from 'prop-types'

const data = [
  {
    name: "panadol",
    instruction: "Sáng: 1 viên, Trưa: 1 viên, Chiều: 1 viên, Tối: 1 viên",
    number: 10,
  },
  {
    name: "panadol",
    instruction: "Sáng: 1 viên, Trưa: 1 viên, Chiều: 1 viên, Tối: 1 viên",
    number: 10,
  },
  {
    name: "panadol",
    instruction: "Sáng: 1 viên, Trưa: 1 viên, Chiều: 1 viên, Tối: 1 viên",
    number: 10,
  },
];

const PrescriptionItem = ({ id, name, instruction, number }) => {
  return (
    <div className="PrescriptionItem">
      <div className="PrescriptionItem__orderNum">
        {id.toString().padStart(2, "0")}
      </div>
      <div className="PrescriptionItem__info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="PrescriptionItem__name">{name}</div>
          <div className="PrescriptionItem__number">
            <span style={{ fontWeight: "500" }}>Số lượng:</span> {number} viên
          </div>
        </div>
        <div className="PrescriptionItem__instruction">{instruction}</div>
      </div>
    </div>
  );
};

function PrescriptionInfo(props) {
  return (
    <div className="RCPrescriptionInfo">
      {data.map((item, index) => {
        return (
          <PrescriptionItem
            key={index}
            id={index + 1}
            name={item.name}
            instruction={item.instruction}
            number={item.number}           
          />
        );
      })}
    </div>
  );
}

// PatientInfo.propTypes = {};

export default PrescriptionInfo;
