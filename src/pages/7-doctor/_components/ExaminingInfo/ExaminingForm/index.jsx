import React, { useState } from "react";
import { Formik, FastField, Form } from "formik";
import Input from "_components/shared/FormikField/Input";
import TextArea from "_components/shared/FormikField/TextArea";
import {Date} from "_components/shared/FormikField/DateTime";
import { FormControlLabel, Switch, Button } from "@mui/material";
import "./index.scss";

export default function ExaminingForm({handleSubmit}) {
  const [isSetAppointment, setAppointment] = useState(false);
  return (
    <Formik
      initialValues={{
        SYMPTOM: "",
        DIAGNOSTIC: "",        
        APPOINTMENT_DATE: new window.Date(),
        BLOOD_PRESSURE: "",
        PULSE: "",
        TEMPERATURE: "",
      }}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form className="ExaminingForm">
            <div className="ExaminingForm__symptom col-1-5">
              <FastField
                name="PULSE"
                id="PULSE"
                component={Input}
                label="Mạch"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-5-9">
              <FastField
                name="BLOOD_PRESSURE"
                id="BLOOD_PRESSURE"
                component={Input}
                label="Huyết áp"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-9-13">
              <FastField
                name="TEMPERATURE"
                id="TEMPERATURE"
                component={Input}
                label="Nhiệt độ"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-1-13">
              <FastField
                name="SYMPTOM"
                id="SYMPTOM"
                component={TextArea}
                label="Triệu chứng"
                rows="2"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-1-13">
              <FastField
                name="DIAGNOSTIC"
                id="DIAGNOSTIC"
                component={TextArea}
                label="Chẩn đoán"
                rows="2"
                required
              />
            </div>
            <div className="col-1-9">
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={isSetAppointment}
                    onChange={(e) => setAppointment(e.target.checked)}
                  />
                }
                label="Tái khám"
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 14.4,
                  },
                  marginTop: '.7rem'
                }}
              />
              {isSetAppointment && (
                <FastField
                  name="APPOINTMENT_DATE"
                  id="APPOINTMENT_DATE"
                  label="Ngày tái khám"
                  component={Date}
                  required
                />
              )}
            </div>
            <div className="col-10-13">
                <Button type="submit">Xác nhận</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
