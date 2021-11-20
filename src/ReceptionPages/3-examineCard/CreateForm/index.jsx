import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { CustomPaper } from "_components/StyledComponent";
import ContentForm from "./ContentForm";
import "./index.scss";
// import PropTypes from 'prop-types'

function CreateForm(props) {
  const history = useHistory();
  const handleSubmit = (value) => {
    console.log(value);
  }
  return (
    <div className="ExamineForm">
      <div className="ExamineForm__title">
        <CustomPaper
          className="ExamineForm__titleBack"
          onClick={() =>
            history.push(
              history.location.pathname.split("/").slice(0, 3).join("/")
            )
          }
        >
          <ArrowBack className="icon" />
        </CustomPaper>
        <CustomPaper className="ExamineForm__titleWord">
          Tạo phiếu khám
        </CustomPaper>
      </div>
      <div className="ExamineForm__content">
        <ContentForm onSubmit={handleSubmit}/>       
      </div>
    </div>
  );
}

CreateForm.propTypes = {};

export default CreateForm;
