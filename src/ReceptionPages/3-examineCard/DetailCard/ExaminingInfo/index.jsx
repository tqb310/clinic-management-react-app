import React from "react";
import { TextField } from "@mui/material";
// import {CustomPaper} from '_components/StyledComponent';
import "./index.scss";
// import PropTypes from 'prop-types'

function ExaminingInfo(props) {
  return (
    <div className="RCExaminingInfo">     
      <div className="RCExaminingInfo__name col-1-5">
        <TextField
          variant="filled"
          label="Mạch"
          value="80"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="RCExaminingInfo__birthdate col-5-9">
        <TextField
          variant="filled"
          label="Huyết áp"
          value="110"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="RCExaminingInfo__age col-9-13">
        <TextField
          variant="filled"
          label="Nhiệt độ"
          value="37.5"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="RCExaminingInfo__gender col-1-13">
        <TextField
          variant="filled"
          label="Triệu chứng"
          value="Đau bụng dữ dội"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="RCExaminingInfo__phone col-1-13">
        <TextField
          variant="filled"
          label="Chẩn đoán"
          value="Viêm bao tử"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>     
    </div>
  );
}

// PatientInfo.propTypes = {};

export default ExaminingInfo;