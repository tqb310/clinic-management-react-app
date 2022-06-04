import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { Formik, Form, FastField } from "formik";
import { Close, Clear } from "@mui/icons-material";
import Input from "_components/shared/FormikField/Input";
import "./index.scss";

const handleDoseString = (label, data) => {
  return data ? `${label}: ${data} viên` : "";
};

const PrescriptionItem = ({
  id,
  name,
  instruction,
  number,
  onClick,
  onClickItem,
}) => {
  return (
    <div className="PrescriptionItem" onClick={() => onClickItem(id)}>
      <div className="PrescriptionItem__orderNum">
        {id.toString().padStart(2, "0")}
      </div>
      <div className="PrescriptionItem__info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="PrescriptionItem__name">{name}</div>
          <div className="PrescriptionItem__number">
            <span style={{ fontWeight: "500" }}>Số lượng:</span> {number} viên
          </div>
        </div>
        <div className="PrescriptionItem__instruction">{instruction}</div>
      </div>
      <div className="PrescriptionItem__action">
        <IconButton
          sx={{ opacity: 0.5, "&:hover": { opacity: 0.9 } }}
          onClick={() => onClick(id)}
        >
          <Clear />
        </IconButton>
      </div>
    </div>
  );
};

export default function PrescriptionForm({ open, handleClose, handleSubmit }) {
  const [data, setData] = useState([]);
  const onClick = (id) => {
    setData([...data.slice(0, id - 1), ...data.slice(id)]);
  };
  const onClickItem = (id) => {
    return;
  }
  const handleAddDrug = (value, { resetForm }) => {
    // console.log(value);
    const doseString = `${handleDoseString(
      "Sáng",
      value.instruction.dose.morning
    )}, ${handleDoseString(
      "Trưa",
      value.instruction.dose.noon
    )}, ${handleDoseString(
      "Chiều",
      value.instruction.dose.afternoon
    )}, ${handleDoseString("Tối", value.instruction.dose.evening)} - ${
      value.instruction.advice
    }`;
    const prescriptionData = {
      DRUG_NAME: value.drugName,
      NUMBER: value.number,
      INSTRUCTION: doseString,
    };
    // console.log(prescriptionData);
    setData([...data, prescriptionData]);
    resetForm();
  };
  const handleSave = () => {
    handleSubmit(data);
    handleClose();
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
        Kê toa thuốc
        <IconButton
          sx={{ position: "absolute", top: 3, right: 15 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ boxSizing: "border-box", width: 600 }}>
        <Formik
          initialValues={{
            drugName: "",
            number: "",
            instruction: {
              dose: {
                morning: "",
                noon: "",
                afternoon: "",
                evening: "",
              },
              advice: "",
            },
          }}
          onSubmit={handleAddDrug}
        >
          {({ values }) => {
            // console.log(values);
            return (
              <Form className="PrescriptionForm">
                <div className="col-1-8">
                  <FastField
                    id="drugName"
                    name="drugName"
                    label="Tên thuốc"
                    component={Input}
                    left="-5%"
                    variant="filled"
                    required
                  />
                </div>
                <div className="col-9-12">
                  <FastField
                    id="number"
                    name="number"
                    label="Số lượng"
                    component={Input}
                    type="number"
                    variant="outlined"
                    left="-12px"
                    required
                  />
                </div>
                <span
                  className="col-12-13"
                  style={{ transform: "translateY(10px)", textAlign: "right" }}
                >
                  Viên
                </span>
                <div
                  className="col-1-13"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ transform: "translateY(10px)" }}>
                    Liều dùng
                  </span>
                  <div
                    style={{
                      display: "flex",
                      width: "18%",
                    }}
                  >
                    <FastField
                      id="instruction.dose"
                      name="instruction.dose.morning"
                      label="Sáng"
                      component={Input}
                      type="number"
                      variant="outlined"
                      left="-12px"
                      required
                    />
                    <span style={{ transform: "translateY(10px)" }}>Viên</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "18%",
                    }}
                  >
                    <FastField
                      id="instruction.dose"
                      name="instruction.dose.noon"
                      label="Trưa"
                      component={Input}
                      type="number"
                      variant="outlined"
                      left="-12px"
                      required
                    />
                    <span style={{ transform: "translateY(10px)" }}>Viên</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "18%",
                    }}
                  >
                    <FastField
                      id="instruction.dose"
                      name="instruction.dose.afternoon"
                      label="Chiều"
                      component={Input}
                      type="number"
                      variant="outlined"
                      left="-12px"
                      required
                    />
                    <span style={{ transform: "translateY(10px)" }}>Viên</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "18%",
                    }}
                  >
                    <FastField
                      id="instruction.dose"
                      name="instruction.dose.evening"
                      label="Tối"
                      component={Input}
                      type="number"
                      variant="outlined"
                      left="-12px"
                      required
                    />
                    <span style={{ transform: "translateY(10px)" }}>Viên</span>
                  </div>
                </div>
                <div className="col-1-13">
                  <FastField
                    id="instruction.advice"
                    name="instruction.advice"
                    label="Lời dặn"
                    component={Input}
                    variant="outlined"
                    left="-12px"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    textTransform: "Capitalize",
                    transform: "translateX(250px)",
                    padding: 0,
                  }}
                >
                  Thêm
                </Button>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogContent dividers>
        {data.map((drug, index) => {
          return (
            <PrescriptionItem
              key={index}
              id={index + 1}
              name={drug.DRUG_NAME}
              instruction={drug.INSTRUCTION}
              number={drug.NUMBER}
              onClick={onClick}
              onClickItem={onClickItem}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Hủy
        </Button>
        <Button onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
