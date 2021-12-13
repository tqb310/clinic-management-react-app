import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { TextField } from "@mui/material";
import { CustomPaper } from "_components/StyledComponent";
import PatientInfo from "../PatientInfo";
import ServiceInfo from "../ServiceInfo";
import ExaminingInfo from "../ExaminingInfo";
import "./index.scss";
// import PropTypes from 'prop-types'

function ExamineCard(props) {
  return (
    <Scrollbars style={{ width: "100%", height: "100%" }} autoHide={true}>
      <CustomPaper className="DTExamineCard">
        <div className="DTExamineCard__header">
          <p>Phiếu khám bệnh</p>
          <p>
            <span>#123456</span>
          </p>
        </div>
        <div className="DTExamineCard__cardInfo">
          <p>
            <span>Ngày lập</span>
            <TextField
              variant="filled"
              value="13/12/2021"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  paddingTop: 0,
                },
                width: 150
              }}
            />
          </p>
          <p>
            <span>Nhân viên tiếp nhận</span>
            <TextField
              variant="filled"
              value="Đặng Ngọc Liêm"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  paddingTop: 0,
                },
                width: 200
              }}
            />
          </p>
        </div>
        <div className="DTExamineCard__content">
          <div className="DTExamineCard__patientInfo">
            <PatientInfo />
          </div>
          <div className="DTExamineCard__service">
            <ServiceInfo />
          </div>
          <div className="DTExamineCard__examineInfo">
            <ExaminingInfo />
          </div>
          <div className="DTExamineCard__setAppointment"></div>
        </div>
        <div className="DTExamineCard__footer"></div>
      </CustomPaper>
    </Scrollbars>
  );
}

ExamineCard.propTypes = {};

export default ExamineCard;
