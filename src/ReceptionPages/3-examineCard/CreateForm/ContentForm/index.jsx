import React from "react";
import { Formik, Form,} from "formik";
import { CustomPaper } from "_components/StyledComponent";
import LeftContent from "../LeftContentForm";
import RightContent from "../RightContentForm/index";
import Payment from "../Payment";
import { district, province, ward, gender } from "_constants/FakeData/Select";
import authentication from "_services/authentication.service";
import "./index.scss";
// import PropTypes from 'prop-types';

function ContentForm({onSubmit}) {  
  // console.log(authentication.getCurrentUser()?.payload);
  return (
    <div>
      <Formik
        initialValues={{
          PATIENT_NAME: "",
          PHONE: "",
          DATE_OF_BIRTH: null,          
          CREATE_AT: new Date(),
          GENDER: "",          
          occupation: "",
          IDENTITY_NUMBER: "",
          ADDRESS: {
            details: '',
            ward: '',
            district: '',
            province: ''
          },
          NOTE: "",
          RECEPTIONIST: authentication.getCurrentUser()?.payload.employee_id,
          DOCTOR_ID: "1",
          SERVICES: ['1'],
          DIAGNOSTIC_FEE: 80000
        }}
        onSubmit={(value) => {
          const p = province.find(item => item.value == value.ADDRESS.province).key;
          const d = district.find(item => item.value == value.ADDRESS.district).key;
          const w = ward.find(item => item.value == value.ADDRESS.ward).key;
          const det = value.ADDRESS.details;
          const handledValue = {
            ...value,
            ADDRESS: `${det ? det + ', ' : ''}${w}, ${d}, ${p}`
          }
          onSubmit(handledValue);
        }}
      >
        {({values, errors}) => {
          // console.log(values);
          const ddistrict = district.filter(item => item.province === values.ADDRESS.province);
          const dward = ward.filter(item => item.district === values.ADDRESS.district);
          return (
            <Form className="ContentForm">
              <div style={{display:'flex'}}>
                <CustomPaper className="ContentForm__left">
                  <LeftContent province={province} district={ddistrict} ward={dward} gender={gender}/>
                </CustomPaper>
                <div className="ContentForm__right">
                  <RightContent/>
                </div>
              </div>
              <div className="ContentForm__payment">
                <Payment/>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

ContentForm.propTypes = {};

export default ContentForm;
