import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { CustomPaper } from "_components/shared/StyledComponent";
import ContentForm from "./ContentForm";
import diagnostic from "_services/diagnostic.service";
import { dateParse, timeParse } from "_constants/date";
import "./index.scss";
// import PropTypes from 'prop-types'

function CreateForm(props) {
  const history = useHistory();
  const handleSubmit = async (value) => {
    console.log(value);
    value.DATE_OF_BIRTH = dateParse(value.DATE_OF_BIRTH);
    value.CREATE_AT = dateParse(value.CREATE_AT) + " " + timeParse(value.CREATE_AT);
    let data = await diagnostic.createDiagnostic(value);
    switch (data) {
      case null:
        alert("Co loi xay ra!");
        break;
      default:
        alert(`Tao phieu kham thanh cong, so thu tu: ${data}`);
    }
  };
  
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
        <ContentForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

CreateForm.propTypes = {};

export default CreateForm;
