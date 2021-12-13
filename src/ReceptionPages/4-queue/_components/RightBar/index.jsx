import React from 'react';
import PatientInfor from './PatientInfor';
import CardInfor from './CardInfor';
import './index.scss';
// import PropTypes from 'prop-types';


function RightBarContent({data}) {
    console.log(data)
    const info = data.data
    return (
        <div className="queryRightbar">
            <div className="queryRightbar__header">
                <span>Mã phiếu</span>
                <div className="queryRightbar__id">{info.diagnostic.DIAGNOSTIC_ID}</div>
            </div>
            <div>
                <CardInfor
                    createAt={info.diagnostic.CREATE_AT}
                    type="Khám mới-Thêm type"
                    doctor={info.diagnostic.DOCTOR.EMPLOYEE_NAME}
                    status={info.diagnostic.STATUS}
                />
                <PatientInfor
                    name={info.diagnostic.PATIENT.PATIENT_NAME}
                    id={info.diagnostic.PATIENT.PATIENT_ID}
                    dateOfBirth={info.diagnostic.PATIENT.DATE_OF_BIRTH}
                    gender={info.diagnostic.PATIENT.GENDER}
                    occupation={info.diagnostic.PATIENT.OCCUPATION}
                    identityNumber={info.diagnostic.PATIENT.IDENTITY_NUMBER}
                    address={info.diagnostic.PATIENT.ADDRESS}
                />
            </div>
        </div>
    )
}

RightBarContent.propTypes = {

}

export default RightBarContent

