import React, {memo} from 'react';
import {
    Work,
    BrandingWatermark,
    Edit,
    EventNote,
} from '@mui/icons-material';
import {Typography, Avatar} from '@mui/material';
import {
    CustomPaper,
    Dot,
} from '_components/shared/StyledComponent';
import FemalePatient from '_assets/images/female-patient.png';
import MalePatient from '_assets/images/male-patient.png';
import {formatDate} from '_helpers/handleDate';
import './index.scss';
// import {IconButton} from '@mui/material';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {dateParse} from '_constants/date';
// import {gender} from '_constants/general';
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
            {/* <div className="PatientInfor__EditIcon">
                <IconButton>
                    <FontAwesomeIcon
                        icon="edit"
                        style={{
                            color: 'white',
                            fontSize: '1rem',
                        }}
                    />
                </IconButton>
            </div> */}
            <div className="PatientInfor__general">
                <Avatar
                    className="PatientInfor__avatar"
                    src={
                        data.gender
                            ? MalePatient
                            : FemalePatient
                    }
                />
                <div className="PatientInfor__name">
                    <p>
                        {data.last_name +
                            ' ' +
                            data.first_name}
                    </p>
                    <p>
                        Lần khám gần nhất:{' '}
                        <span>
                            {data.create_at ||
                                formatDate(
                                    new Date().toLocaleDateString(),
                                )}
                        </span>
                    </p>
                </div>
            </div>
            <div className="PatientInfor__rest">
                <div className="PatientInfor__item">
                    <p>
                        <Work className="queryIcon" />
                        Nghề nghiệp
                    </p>
                    <p>{data.occupation}</p>
                </div>
                <div className="PatientInfor__item">
                    <p>
                        <BrandingWatermark className="queryIcon" />
                        Thẻ căn cước
                    </p>
                    <p>{data.identity_number}</p>
                </div>
                <div className="PatientInfor__item full">
                    <p>
                        <EventNote className="queryIcon" />
                        Lịch hẹn tái khám
                    </p>
                    <span>
                        {data.follow_up_date || 'Không có'}
                    </span>{' '}
                    {data.follow_up_time && (
                        <>
                            <Dot />
                            <span>
                                {data.follow_up_time}
                            </span>
                        </>
                    )}
                </div>
                <div className="PatientInfor__note PatientInfor__item full">
                    <p>
                        <Edit className="queryIcon" />
                        Ghi chú
                    </p>
                    <p>{data.note}</p>
                </div>
            </div>
        </CustomPaper>
    );
}

PatientInfor.propTypes = {};

export default memo(PatientInfor);
