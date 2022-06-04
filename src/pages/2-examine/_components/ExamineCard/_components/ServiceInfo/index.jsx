import React from 'react';
// import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function ServiceInfo({data}) {
    return (
        <div className="ECServiceInfo">
            <table className="ECServiceInfo__table">
                <thead>
                    <tr>
                        <th width="150px">STT</th>
                        <th width="auto">Dịch vụ</th>
                        <th width="200px">Phí (vnd)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Khám thường</td>
                        <td>80,000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Siêu âm</td>
                        <td>150,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

ServiceInfo.propTypes = {};

export default ServiceInfo;
