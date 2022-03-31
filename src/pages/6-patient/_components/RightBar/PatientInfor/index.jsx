import React, {memo} from 'react';
import {
    Work,
    BrandingWatermark,
    Edit,
    EventNote,
} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typography, Avatar} from '@mui/material';
import {
    CustomPaper,
    Dot,
} from '_components/shared/StyledComponent';
import FemalePatient from '_assets/images/female-patient.png';
// import {dateParse} from '_constants/date';
// import {gender} from '_constants/general';
import './index.scss';
// import PropTypes from 'prop-types'

function PatientInfor({data}) {
    // console.log(data);
    return (
        <CustomPaper className="PatientInfor">
            <Typography
                variant="h6"
                sx={{gridColumn: '1/3', mb: 2}}
            >
                Thông tin bệnh nhân
            </Typography>
            <div className="PatientInfor__EditIcon">
                <IconButton>
                    <FontAwesomeIcon
                        icon="edit"
                        style={{
                            color: 'white',
                            fontSize: '1rem',
                        }}
                    />
                </IconButton>
            </div>
            <div className="PatientInfor__general">
                <Avatar
                    className="PatientInfor__avatar"
                    src={FemalePatient}
                />
                <div className="PatientInfor__name">
                    <p>Trương Thị Lan</p>
                    <p>
                        Lần khám gần nhất:{' '}
                        <span>28/03/2022</span>
                    </p>
                </div>
            </div>
            <div className="PatientInfor__rest">
                <div className="PatientInfor__item">
                    <p>
                        <Work className="queryIcon" />
                        Nghề nghiệp
                    </p>
                    <p>Nghề may</p>
                </div>
                <div className="PatientInfor__item">
                    <p>
                        <BrandingWatermark className="queryIcon" />
                        Thẻ căn cước
                    </p>
                    <p>261612345</p>
                </div>
                <div className="PatientInfor__item full">
                    <p>
                        <EventNote className="queryIcon" />
                        Lịch hẹn tái khám
                    </p>
                    <span>29/03/2022</span> <Dot />{' '}
                    <span>07:15</span>
                </div>
                <div className="PatientInfor__note PatientInfor__item full">
                    <p>
                        <Edit className="queryIcon" />
                        Ghi chú
                    </p>
                    <p>
                        {' '}
                        Bệnh nhân bị khiếm thính, vui lòng
                        giao tiếp với người nhà của bệnh
                        nhân
                    </p>
                </div>
            </div>
        </CustomPaper>
    );
}

PatientInfor.propTypes = {};

export default memo(PatientInfor);
