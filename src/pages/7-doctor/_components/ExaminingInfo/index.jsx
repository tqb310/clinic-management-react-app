import React from "react";
// import {CustomPaper} from '_components/shared/StyledComponent';
import ExaminingForm from './ExaminingForm';
import "./index.scss";
// import PropTypes from 'prop-types'

function ExaminingInfo({handleSubmit}) {
  return (
    <div className="ECServiceInfo">
      <ExaminingForm handleSubmit={handleSubmit}/>
    </div>
  );
}

ExaminingInfo.propTypes = {};

export default ExaminingInfo;
