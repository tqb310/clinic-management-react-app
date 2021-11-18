import React from "react";
import { Formik, Form, FastField } from "formik";
// import PropTypes from 'prop-types';

function ContentForm(props) {
  return (
    <div>
      <Formik initialValues={
          {
              patientName: "",
              phoneNumber: "",
              birthDate: "",
              type: "",
              createAt: "",
              sex: "",
              age: "",
              occupation: "",
              idCard: "",
              address: "",
              note: "",
          }
      }>
        {({}) => {
          <Form className>
              <FastField name="patientName" component/>
          </Form>;
        }}
      </Formik>
    </div>
  );
}

ContentForm.propTypes = {};

export default ContentForm;
