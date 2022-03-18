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
import userService from '_services/user.service'
// import handlePriceFormat from "_helpers/handlePriceFormat.js";
import "./index.scss";

function PasswordForm({ open, handleClose }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const handleSubmit = async () => {
    console.log({ oldPass, newPass });
    let result = await userService.changePassword({oldPass, newPass})
    switch(result){
      case null: alert('Lỗi server');break;
      case undefined: alert('Mật khẩu không đúng!'); break;
      default: alert('Đổi mật khẩu thành công')
    }

  };
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
        Cập nhật mật khẩu
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
          className="PasswordForm"
          sx={{ boxSizing: "border-box", width: 300 }}
        >
          <div className="col-1-13">
            <TextField
              name="oldPass"
              type="password"
              onChange={(e) => setOldPass(e.target.value)}
              style={{ width: "100%", margin: "1rem 0" }}
              label="Mật khẩu cũ"
              size="small"
              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
              required
              />
          </div>
          <div className="col-1-13">
            <TextField
              name="newPass"
              type="password"
              onChange={(e) => setNewPass(e.target.value)}
              style={{ width: "100%", margin: "1rem 0" }}
              label="Mật khẩu mới"
              size="small"
              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
              required
              />
          </div>
          <div className="col-1-13">
            <TextField
              type="password"
              style={{ width: "100%", margin: "1rem 0" }}
              label="Xác nhận mật khẩu"
              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
              onChange={(e) => setConfirm(e.target.value)}
              size="small"
              error={newPass !== confirm}
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="error">
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Cập nhật</Button>
        </DialogActions>
      </FormControl>
    </Dialog>
  );
}

export default PasswordForm;
