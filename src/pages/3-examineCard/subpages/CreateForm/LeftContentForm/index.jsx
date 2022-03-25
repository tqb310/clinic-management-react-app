import React from "react";
import { FastField, Field } from "formik";
import User from "_assets/images/default-avatar.png";
import {
  CameraAlt,
  Person,
  PhoneEnabled,
  BrandingWatermark,
  Work,
  Home,
  Edit,
} from "@mui/icons-material";
import { TextField, FormControl, FormLabel } from "@mui/material";
import Input from "_components/shared/FormikField/Input";
import { Date } from "_components/shared/FormikField/DateTime";
import Select from "_components/shared/FormikField/Select";
import TextArea from "_components/shared/FormikField/TextArea";
import "./index.scss";
// import PropTypes from 'prop-types'

function LeftContent({province, district, ward, gender}) {
  return (
    <div className="LeftContent">
      <h4 className="col-1-13">Thông tin bệnh nhân</h4>
      <div className="LeftContent__avatarField col-1-6 row-2-4">
        <div className="LeftContent__avatarWrapper">
          <img
            src={User}
            className="LeftContent__avatar"
            alt="default avatar"
            width={112}
            height={112}
          />
          <label className="LeftContent__avatarTitle" htmlFor="avatar">
            <CameraAlt style={{ fontSize: 30 }} />
          </label>
          <input
            id="avatar"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
      </div>
      <div className="col-7-13">
        <FastField
          name="PATIENT_NAME"
          id="PATIENT_NAME"
          component={Input}
          label="Tên bệnh nhân"
          required
          icon={Person}
        />
      </div>
      <div className="col-7-13">
        <FastField
          name="PHONE"
          id="PHONE"
          component={Input}
          label="Điện thoại"
          required
          icon={PhoneEnabled}
          type="number"
        />
      </div>
      <div className="col-1-6">
        <FastField
          name="DATE_OF_BIRTH"
          id="DATE_OF_BIRTH"
          component={Date}
          label="Ngày sinh"
          required
        />
      </div>
      <div className="col-7-9">
        <TextField
          label="Tuổi"
          variant="standard"
          sx={{
            "& label+.MuiInputBase-root": { marginTop: "8px !important" },
            "& label": { top: "-15%", fontSize: 15 },
          }}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 200 } }}
          size="small"
          defaultValue={21}
        />
      </div>
      <div className="col-10-13">
        <FastField
          name="GENDER"
          id="GENDER"
          component={Select}
          label="Giới tính"
          items={gender}
          required
        />
      </div>
      <div className="col-1-6">
        <FastField
          name="IDENTITY_NUMBER"
          id="IDENTITY_NUMBER"
          component={Input}
          label="CMND/CCCD"
          icon={BrandingWatermark}
          required
        />
      </div>
      <div className="col-7-13">
        <FastField
          name="OCCUPATION"
          id="OCCUPATION"
          component={Input}
          label="Nghề nghiệp"
          icon={Work}
          required
        />
      </div>
      <div className="col-1-13">
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
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
              name="ADDRESS.province"
              id="ADDRESS.province"
              component={Select}
              label="Tỉnh/Thành phố"
              items={province}
              // onChange={handleProvinceChange}
              required
            />
            <Field
              name="ADDRESS.district"
              id="ADDRESS.district"
              component={Select}
              label="Huyện/Quận"
              items={district}
              // onChange={handleDistrictChange}
              required
            />
            <Field
              name="ADDRESS.ward"
              id="ADDRESS.ward"
              component={Select}
              label="Xã/Phường"
              items={ward}
              required
            />
          </div>
          <FastField
            name="ADDRESS.details"
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
          name="NOTE"
          id="NOTE"
          component={TextArea}
          label="Ghi chú"
          icon={Edit}
          multiline
          rows={3}
        />
      </div>
    </div>
  );
}

LeftContent.propTypes = {};

export default LeftContent;
