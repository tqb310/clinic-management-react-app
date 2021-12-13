import React from "react";
// import {CustomPaper} from '_components/StyledComponent';
import ExaminingForm from './ExaminingForm';
import "./index.scss";
// import PropTypes from 'prop-types'

function ExaminingInfo(props) {
  return (
    <div className="ECServiceInfo">
      <ExaminingForm/>
    </div>
  );
}

ExaminingInfo.propTypes = {};

export default ExaminingInfo;
