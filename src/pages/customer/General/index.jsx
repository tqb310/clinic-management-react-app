import React from "react";
import { FastField, Field } from "formik";
import {
  FormControl,
  FormLabel,
} from "@mui/material";
import Input from "_components/shared/FormikField/Input";
import Select from "_components/shared/FormikField/Select";
import TextArea from "_components/shared/FormikField/TextArea";
import { Date } from "_components/shared/FormikField/DateTime";
import { gender, district, province, ward } from "_constants/FakeData/Select";
import {  
  Person,
  PhoneEnabled,
  BrandingWatermark,
  Work,
  Home,
  Edit,
} from "@mui/icons-material";
import "./index.scss";
// import PropTypes from 'prop-types'

function General(props) {
  return (
    <div className="AppointmentForm__general">
      <div className="col-1-8">
        <FastField
          id="patient_name"
          name="patient.patient_name"
          component={Input}
          label="Tên bệnh nhân"
          icon={Person}
          left="-4.5%"
          required
        />
      </div>
      <div className="col-9-13">
        <FastField
          id="gender"
          name="patient.gender"
          component={Select}
          label="Giới tính"
          items={gender}
          required
        />
      </div>
      <div className="col-1-8">
        <FastField
          id="phone"
          name="patient.phone"
          component={Input}
          label="Điện thoại"
          left="-4.5%"
          icon={PhoneEnabled}
          required
        />
      </div>
      <div className="col-9-13">
        <FastField
          id="date_of_birth"
          name="patient.date_of_birth"
          component={Date}
          label="Ngày sinh"
          required
        />
      </div>
      <div className="col-1-8">
        <FastField
          id="identity_number"
          name="patient.identity_number"
          component={Input}
          label="CMND/CCCD"
          left="-4.5%"
          icon={BrandingWatermark}
          required
        />
      </div>
      <div className="col-9-13">
        <FastField
          id="occupation"
          name="patient.occupation"
          component={Input}
          label="Nghề nghiệp"
          left="-6.5%"
          icon={Work}
          required
        />
      </div>
      <div className="col-1-13">
        <FormControl fullWidth sx={{ marginBottom: ".5rem" }}>
          <FormLabel sx={{ fontWeight: 600, fontSize: 14 }}>Địa chỉ</FormLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridColumnGap: "1rem",
              marginTop: ".8rem",
            }}
          >
            <Field
              name="patient.address.province"
              id="ADDRESS.province"
              component={Select}
              label="Tỉnh/Thành phố"
              items={province}
              required
            />
            <Field
              name="patient.address.district"
              id="ADDRESS.district"
              component={Select}
              label="Huyện/Quận"
              items={district}
              required
            />
            <Field
              name="patient.address.ward"
              id="ADDRESS.ward"
              component={Select}
              label="Xã/Phường"
              items={ward}
              required
            />
          </div>
          <FastField
            name="patient.address.details"
            id="ADDRESS.details"
            component={TextArea}
            label="Số nhà, tên đường..."
            icon={Home}
            multiline
            rows={2}
          />
        </FormControl>
      </div>
      <div className="col-1-13">
        <FastField
          name="patient.note"
          id="NOTE"
          component={TextArea}
          label="Ghi chú"
          icon={Edit}
          multiline
          rows={2}
        />
      </div>
    </div>
  );
}

General.propTypes = {};

export default General;
