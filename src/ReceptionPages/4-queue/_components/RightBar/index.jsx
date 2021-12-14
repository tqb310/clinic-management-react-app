import React from 'react';
import PatientInfor from './PatientInfor';
import CardInfor from './CardInfor';
import './index.scss';
// import PropTypes from 'prop-types';


function RightBarContent({ data }) {
    const info = data.data
    console.log(info)
    return (
        <div className="queryRightbar">
            <div className="queryRightbar__header">
                <span>Mã phiếu</span>
                <div className="queryRightbar__id">{info.diagnostic.DIAGNOSTIC_ID}</div>
            </div>
            <div>
                <CardInfor
                    createAt={info.diagnostic.CREATE_AT}
                    type={'Khám mới'}
                    doctor={info.diagnostic.DOCTOR.EMPLOYEE_NAME}
                    status={info.status}

                />
                <PatientInfor
                    data={info.diagnostic.PATIENT}
                />
            </div>
        </div>
    )
}

RightBarContent.propTypes = {

}

export default RightBarContent

