import React, { useState } from "react";
import { Formik, FastField } from "formik";
import Input from "_components/FormikField/Input";
import TextArea from "_components/FormikField/TextArea";
import {Date} from "_components/FormikField/DateTime";
import { FormControlLabel, Switch } from "@mui/material";
import "./index.scss";

export default function ExaminingForm() {
  const [isSetAppointment, setAppointment] = useState(false);
  return (
    <Formik
      initialValues={{
        symtomp: "",
        diagnostic: "",
        prescription: "",
        appointmentDate: new window.Date(),
        bloodPressure: "",
        pulse: "",
        temperature: "",
      }}
    >
      {() => {
        return (
          <div className="ExaminingForm">
            <div className="ExaminingForm__symptom col-1-5">
              <FastField
                name="pulse"
                id="pulse"
                component={Input}
                label="Mạch"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-5-9">
              <FastField
                name="bloodPressure"
                id="bloodPressure"
                component={Input}
                label="Huyết áp"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-9-13">
              <FastField
                name="temperature"
                id="temperature"
                component={Input}
                label="Nhiệt độ"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-1-13">
              <FastField
                name="symtomp"
                id="symtomp"
                component={TextArea}
                label="Triệu chứng"
                rows="2"
                required
              />
            </div>
            <div className="ExaminingForm__symptom col-1-13">
              <FastField
                name="diagnostic"
                id="diagnostic"
                component={TextArea}
                label="Chẩn đoán"
                rows="2"
                required
              />
            </div>
            <div className="col-1-13">
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
                  name="appointmentDate"
                  id="appointmentDate"
                  label="Ngày tái khám"
                  component={Date}
                  required
                />
              )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
