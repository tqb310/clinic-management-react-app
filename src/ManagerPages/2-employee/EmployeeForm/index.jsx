import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form, FastField, Field } from "formik";
import Input from "_components/FormikField/Input";
import Select from "_components/FormikField/Select";
import { Date } from "_components/FormikField/DateTime";
import { gender, role } from "_constants/FakeData/Select";
import "./index.scss";

export default function EmployeeForm({ open, handleClose, handleSubmit }) {
  const handleSubmitForm = (value) => {
    handleSubmit(value);
    handleClose();
  };
  return (
    <div>
      <Dialog modal={true} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            position: "relative",
            padding: ".8rem 1.5rem .8rem 1.5rem",
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          Tạo nhân viên
          <IconButton
            sx={{ position: "absolute", top: 3, right: 15 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Formik
          initialValues={{
            EMPLOYEE_NAME: "",
            IDENTITY_NUMBER: "",
            PHONE: "",
            GENDER: "",
            DATE_OF_BIRTH: "",
            EMPLOYEE_ADDRESS: "",
            POSITION: "",
            START_WORK_DATE: "",
            SALARY: "",
            USERNAME: "",
            PASSWORD: Math.random().toString(32).substr(2, 8),
          }}
          onSubmit={handleSubmitForm}
        >
          {({ values }) => {
            // console.log(values);
            return (
              <Form>
                <DialogContent
                  dividers
                  className="EmployeeForm"
                  sx={{ boxSizing: "border-box", width: 600 }}
                >
                  <div className="col-1-7">
                    <FastField
                      id="EMPLOYEE_NAME"
                      name="EMPLOYEE_NAME"
                      label="Tên nhân viên"
                      component={Input}
                      left="-5%"
                      required
                    />
                  </div>
                  <div className="col-8-13">
                    <FastField
                      id="PHONE"
                      name="PHONE"
                      label="Điện thoại"
                      component={Input}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-1-4">
                    <FastField
                      id="DATE_OF_BIRTH"
                      name="DATE_OF_BIRTH"
                      label="Ngày sinh"
                      component={Date}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-5-7">
                    <FastField
                      id="GENDER"
                      name="GENDER"
                      label="Giới tính"
                      component={Select}
                      items={gender}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-8-13">
                    <FastField
                      id="IDENTITY_NUMBER"
                      name="IDENTITY_NUMBER"
                      label="CMND/CCCD"
                      component={Input}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-1-4">
                    <FastField
                      id="START_WORK_DATE"
                      name="START_WORK_DATE"
                      label="Ngày vào làm"
                      component={Date}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-5-7">
                    <FastField
                      id="POSITION"
                      name="POSITION"
                      label="Bộ phận"
                      component={Select}
                      items={role}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-8-13">
                    <FastField
                      id="SALARY"
                      name="SALARY"
                      label="Lương"
                      component={Input}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-1-7">
                    <Field
                      id="USERNAME"
                      name="USERNAME"
                      label="Tên đăng nhập"
                      component={Input}
                      left="-12px"
                      value={
                        !values["USERNAME"]
                          ? values["EMPLOYEE_NAME"]
                              .toLowerCase()
                              .split(" ")
                              .join("")
                          : values["USERNAME"]
                      }
                      required
                    />
                  </div>
                  <div className="col-8-13">
                    <FastField
                      id="PASSWORD"
                      name="PASSWORD"
                      label="Mật khẩu"
                      component={Input}
                      left="-12px"
                      required
                    />
                  </div>
                  <div className="col-1-13">
                    <FastField
                      id="EMPLOYEE_ADDRESS"
                      name="EMPLOYEE_ADDRESS"
                      label="Địa chỉ"
                      component={Input}
                      left="-12px"
                      required
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button type="button" onClick={handleClose} color="error">
                    Hủy
                  </Button>
                  <Button type="submit">Tạo</Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
}
