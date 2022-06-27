import React, {memo} from 'react';
// import { TextField } from "@mui/material";
// import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

const PrescriptionItem = ({
    id,
    name,
    advice,
    number,
    dosage = {},
}) => {
    return (
        <div className="PrescriptionItem">
            <div className="PrescriptionItem__orderNum">
                {id.toString().padStart(2, '0')}
            </div>
            <div className="PrescriptionItem__info">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className="PrescriptionItem__name">
                        {name}
                    </div>
                    <div className="PrescriptionItem__number">
                        <span style={{fontWeight: '500'}}>
                            Số lượng:
                        </span>{' '}
                        {number} viên
                    </div>

                    <div
                        className="PrescriptionItem__dosage"
                        style={{
                            display: 'flex',
                            marginTop: '.5rem',
                        }}
                    >
                        <div>
                            <span>Sáng: </span>
                            <span>
                                {dosage?.morning || 0}
                            </span>
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                            <span>Trưa: </span>
                            <span>{dosage?.noon || 0}</span>
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                            <span>Chiều: </span>
                            <span>
                                {dosage?.afternoon || 0}
                            </span>
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                            <span>Tối: </span>
                            <span>
                                {dosage?.evening || 0}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="PrescriptionItem__advice">
                    {advice}
                </div>
            </div>
        </div>
    );
};

function PrescriptionInfo({data}) {
    return (
        <div className="RCPrescriptionInfo">
            {data.prescription &&
                data.prescription.length &&
                data.prescription.map((item, index) => {
                    return (
                        <PrescriptionItem
                            key={index}
                            id={index + 1}
                            name={item.name}
                            advice={item.advice}
                            number={item.number}
                            dosage={item.dosage}
                        />
                    );
                })}
        </div>
    );
}

// PatientInfo.propTypes = {};

export default memo(PrescriptionInfo);
