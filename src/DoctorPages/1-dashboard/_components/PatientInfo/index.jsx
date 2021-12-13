import React from 'react';
// import {CustomPaper} from '_components/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function PatientInfo(props) {
    return (
        <div className="ECPatientInfo">
            <div className="ECPatientInfo__avatar col-1-3 row-1-3">
                avatar
            </div>
            <div className="ECPatientInfo__name col-3-7">
                Truong Quoc bao
            </div>
            <div className="ECPatientInfo__birthdate col-7-10">
                03/10/2000
            </div>
            <div className="ECPatientInfo__age col-10-11">
                21
            </div>
            <div className="ECPatientInfo__gender col-11-13">
                Nam
            </div>
            <div className="ECPatientInfo__phone col-3-7">
                0346126584
            </div>
            <div className="ECPatientInfo__idcard col-7-10">
                261612472
            </div>
            <div className="ECPatientInfo__job col-10-13">
                Sinh viên
            </div>
            <div className="ECPatientInfo__address col-1-13">
                Số 4 - đường Lê Hồng Phong - thị trấn Ma lâm - huyện Hàm Thuận Bắc - tỉnh Bình Thuận
            </div>
            <div className="ECPatientInfo__note col-1-13">
                Nhìn mặt không có cảm tình
            </div>
        </div>
    )
}

PatientInfo.propTypes = {

}

export default PatientInfo

