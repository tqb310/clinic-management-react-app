import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import { Close } from "@mui/icons-material";
// import handlePriceFormat from "_helpers/handlePriceFormat.js";
import appointment from "_services/appointment.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";

function ConfirmRequest({ open, handleClose }) { 
  const handleSubmit = async () => {
    toast.success('Đang xác nhận');
    const rs = await appointment.confirmRequest(open.REQUEST_ID, 2);
    handleClose();
    console.log(rs);
    window.location.reload();
  };
//   console.log(open);
  

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
        Xác nhận yêu cầu lịch hẹn
        <IconButton
          sx={{ position: "absolute", top: 3, right: 15 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <FormControl>
        <DialogContent
          dividers
          className="ConfirmRequest"
          sx={{ boxSizing: "border-box", width: 600 }}
        >
          <div className="col-1-13">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Tên khách hàng"
              size="small"
              value={open.PATIENT_NAME}
            />
          </div>       
          <div className="col-1-7">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="CMND/CCCD"
              size="small"
              value={open.IDENTITY_NUMBER}
            />
          </div>
          <div className="col-8-13">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Điện thoại"
              size="small"
              value={open.PHONE}
            />
          </div>
          <div className="col-1-5">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Ngày sinh"
              size="small"
              value={new Date(open.DATE_OF_BIRTH).toLocaleDateString()}
            />
          </div>
          <div className="col-5-7">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Giới tính"
              size="small"
              value={open.GENDER ? 'Nữ' : 'Nam'}
            />
          </div>
          <div className="col-8-10">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Bác sĩ"
              size="small"
              value={open.DOCTOR_ID}
            />
          </div>
          <div className="col-10-13">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Ngày hẹn"
              size="small"
              value={new Date(open.TIMES).toLocaleDateString()}
            />
          </div>      
          <div className="col-1-13">
            <TextField
              style={{ width: "100%", margin: "1rem 0" }}
              label="Địa chỉ"
              size="small"
              value={open.ADDRESS}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="error">
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Xác nhận</Button>
        </DialogActions>
      </FormControl>
      <ToastContainer/>
    </Dialog>
  );
}

export default ConfirmRequest;
