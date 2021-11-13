import React from 'react';
import PatientInfor from './PatientInfor';
import CardInfor from './CardInfor';
import './index.scss';
// import PropTypes from 'prop-types';


function RightBarContent(props) {
    return (
        <div className="queryRightbar">
            <div className="queryRightbar__header">
                <span>Mã phiếu</span>
                <div className="queryRightbar__id">123456789</div>
            </div>
            <div>
                <CardInfor/>
                <PatientInfor/>
            </div>
        </div>
    )
}

RightBarContent.propTypes = {

}

export default RightBarContent

