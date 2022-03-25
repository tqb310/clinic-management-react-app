import React, {memo} from 'react';
// import { TextField } from "@mui/material";
// import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function ServiceInfo(props) {
    return (
        <div className="RCServiceInfo">
            <table className="RCServiceInfo__table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th width="40%">Dịch vụ</th>
                        <th>Phí (vnd)</th>
                        <th align="center">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Khám thường</td>
                        <td>80,000</td>
                        <td align="center">Đã thu phí</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Siêu âm</td>
                        <td>150,000</td>
                        <td align="center">Chưa thu phí</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// PatientInfo.propTypes = {};

export default memo(ServiceInfo);
