import React from 'react';
import { Work, BrandingWatermark, Home, Edit, Wc, Cake } from "@mui/icons-material";
import {IconButton} from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.scss';
// import PropTypes from 'prop-types'

function PatientInfor(props) {
    return (
        <div className="PatientInfor">
            <div className="PatientInfor__EditIcon">
                <IconButton>
                    <FontAwesomeIcon icon="edit" style={{color: 'white', fontSize: '1rem'}}/>
                </IconButton>
            </div>
            <div className="PatientInfor__general">
                <div className="PatientInfor__avatar">
                    N
                </div>
                <div className="PatientInfor__name">
                    <p>Nguyễn Văn A - 1234</p>
                    <p>01/01/2000</p>
                </div>
            </div>
            <div className="PatientInfor__rest">
                <div className="PatientInfor__job">
                    <p><Wc className="queryIcon"/>Giới tính</p>
                    <p>Nam</p>
                </div>
                <div className="PatientInfor__job">
                    <p><Cake className="queryIcon"/>Tuổi</p>
                    <p>21</p>
                </div>
                <div className="PatientInfor__job">
                    <p><Work  className="queryIcon"/>Nghề nghiệp</p>
                    <p>Sinh viên</p>
                </div>
                <div className="PatientInfor__idperson">
                    <p><BrandingWatermark  className="queryIcon"/>Thẻ căn cước</p>
                    <p>261612345</p>
                </div>
                <div className="PatientInfor__address">
                    <p><Home className="queryIcon"/>Địa chỉ</p>
                    <p>Số 1 - đường A - Phường B - Quận C - TP.HCM</p>
                </div>
            </div>
            <div className="PatientInfor__note">
                <p><Edit className="queryIcon"/>Ghi chú</p>
                <p>abc</p>
            </div>
        </div>
    )
}

PatientInfor.propTypes = {

}

export default PatientInfor

