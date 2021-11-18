import React from "react";
import {CustomPaper} from "_components/StyledComponent";
import ContentForm from "./ContentForm";
import "./index.scss";
// import PropTypes from 'prop-types'

function CreateForm(props) {
  return (
    <CustomPaper className="ExamineForm">
      <div className="ExamineForm__title">Tạo phiếu khám</div>
      <ContentForm/>
    </CustomPaper>
  );
}

CreateForm.propTypes = {};

export default CreateForm;
