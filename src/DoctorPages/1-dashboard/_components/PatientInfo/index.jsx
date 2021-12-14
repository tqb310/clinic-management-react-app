import React from "react";
import { TextField } from "@mui/material";
// import {CustomPaper} from '_components/StyledComponent';
import "./index.scss";
// import PropTypes from 'prop-types'

function PatientInfo(props) {
  return (
    <div className="ECPatientInfo">
      <div className="ECPatientInfo__avatar col-1-3 row-1-3">
        <div className="ECPatientInfo__avatarInner">TB</div>
      </div>
      <div className="ECPatientInfo__name col-3-7">
        <TextField
          variant="filled"
          label="Tên bệnh nhân"
          value="Truong Quoc Bao"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__birthdate col-7-10">
        <TextField
          variant="filled"
          label="Ngày sinh"
          value="03/10/2000"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__age col-10-11">
        <TextField
          variant="filled"
          label="Tuổi"
          value="21"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__gender col-11-13">
        <TextField
          variant="filled"
          label="Giới tính"
          value="Nam"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__phone col-3-7">
        <TextField
          variant="filled"
          label="Điện thoại"
          value="0346126584"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__idcard col-7-10">
        <TextField
          variant="filled"
          label="CMND/CCCD"
          value="261612472"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__job col-10-13">
        <TextField
          variant="filled"
          label="Nghề nghiệp"
          value="Sinh viên"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__address col-1-13">
        <TextField
          multiline
          rows={2}
          variant="filled"
          label="Địa chỉ"
          value="Số 4 - đường Lê Hồng Phong - thị trấn Ma lâm - huyện Hàm Thuận Bắc - tỉnh Bình Thuận"
          size="small"
          sx={{
            "& .MuiInputBase-input": {},
            width: "100%",
          }}
        />
      </div>
      <div className="ECPatientInfo__note col-1-13">
        <TextField
          multiline
          rows={2}
          variant="filled"
          label="Ghi chú"
          value="vdfnkgvdfngdkjndv"
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

PatientInfo.propTypes = {};

export default PatientInfo;
