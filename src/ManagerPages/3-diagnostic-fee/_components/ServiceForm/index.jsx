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
import "./index.scss";

export default function ServiceForm({ open, handleClose, handleSubmit }) {
  const handleSubmitForm = (value) => {    
    handleSubmit(value, open.SERVICE_ID);
    console.log(open.SERVICE_ID);
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
          Tạo dịch vụ
          <IconButton
            sx={{ position: "absolute", top: 3, right: 15 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Formik
          initialValues={{
            SERVICE_NAME: open.SERVICE_NAME || "",
            FEE: open.FEE || "",          
          }}
          onSubmit={handleSubmitForm}
        >
          {({ values }) => {
            // console.log(values);
            return (
              <Form>
                <DialogContent
                  dividers
                  className="ServiceForm"
                  sx={{ boxSizing: "border-box", width: 600 }}
                >
                  <div className="col-1-7">
                    <FastField
                      id="SERVICE_NAME"
                      name="SERVICE_NAME"
                      label="Tên dịch vụ"
                      component={Input}
                      left="-5%"
                      required
                    />
                  </div>
                  <div className="col-8-13">
                    <FastField
                      id="FEE"
                      name="FEE"
                      label="Phí"
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
                  <Button type="submit">{
                    typeof open === 'object' ? 'Sửa' : 'Tạo'
                  }</Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
}
