import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,  
  DialogTitle,
  DialogContent,
  IconButton,
  // Button,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import handlePriceFormat from '_helpers/handlePriceFormat.js'
import "./index.scss";

function ProfileForm({ open, handleClose }) {
  return (
    <Dialog modal={true} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          position: "relative",
          padding: ".8rem 1.5rem .8rem 1.5rem",
          fontSize: "15px",
          fontWeight: 600,
        }}
      >
        Thông tin cá nhân
        <IconButton
          sx={{ position: "absolute", top: 3, right: 15 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        className="ProfileForm"
        sx={{ boxSizing: "border-box", width: 600 }}
      >
        <div className="col-1-7">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Mã nhân viên"
            size="small"
            value="18520501"
          />
        </div>
        <div className="col-8-13">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Tên nhân viên"
            size="small"
            value="Đặng Ngọc Liêm"
          />
        </div>
        <div className="col-1-7">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="CMND/CCCD"
            size="small"
            value="261612345"
          />
        </div>
        <div className="col-8-13">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Điện thoại"
            size="small"
            value="0123456789"
          />
        </div>
        <div className="col-1-5">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Ngày sinh"
            size="small"
            value="01/02/1998"
          />
        </div>
        <div className="col-5-7">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Giới tính"
            size="small"
            value="Nam"
          />
        </div>
        <div className="col-8-10">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Bộ phận"
            size="small"
            value="Tiếp tân"
          />
        </div>
        <div className="col-10-13">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Ngày vào làm"
            size="small"
            value="01/01/2018"
          />
        </div>
        <div className="col-1-13">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Lương"
            size="small"
            value={handlePriceFormat(10000000)}
          />
        </div>
        <div className="col-1-13">
          <TextField
            style={{ width: "100%", margin: "1rem 0" }}
            label="Địa chỉ"
            size="small"
            value="Quận 9 - TP.HCM"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileForm;
