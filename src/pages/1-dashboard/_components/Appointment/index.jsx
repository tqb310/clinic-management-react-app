import React, {memo} from 'react';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Typography, Avatar} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import './index.scss';
// import PropTypes from 'prop-types'
const data = [
    {
        id: 1,
        name: 'Nguyễn Văn Hải Long',
        phone: '0923456789',
        time: '9:30',
        room: 1,
        gender: 1,
        status: 'Chưa khám',
    },
    {
        id: 2,
        name: 'Hoàng Văn Vĩnh',
        phone: '0988989891',
        time: '9:45',
        room: 1,
        gender: 1,
        status: 'Chưa khám',
    },
    {
        id: 3,
        name: 'Đinh Hoàng Nguyên',
        phone: '0374646382',
        time: '10:00',
        room: 1,
        gender: 1,
        status: 'Chưa khám',
    },
    {
        id: 4,
        name: 'Võ Văn Thanh',
        phone: '0900898876',
        room: 1,
        time: '10:15',
        gender: 1,
        status: 'Chưa khám',
    },
    {
        id: 5,
        name: 'Lê Thị Thúy',
        phone: '0907875747',
        room: 1,
        time: '10:30',
        gender: 0,
        status: 'Chưa khám',
    },
    {
        id: 6,
        name: 'Nguyễn Vinh Thắng',
        phone: '0989888736',
        room: 1,
        time: '10:45',
        gender: 1,
        status: 'Chưa khám',
    },
];
function Appointment(props) {
    return (
        <CustomPaper className="Appointment">
            <div className="Appointment__title">
                <Typography variant="h5" sx={{mb: 2}}>
                    Lịch hẹn hôm nay
                </Typography>
            </div>
            <table>
                <thead>
                    <tr>
                        <th align="left">#</th>
                        <th align="left">Tên bệnh nhân</th>
                        <th align="left">Số điện thoại</th>
                        <th>Phòng khám</th>
                        <th>Giờ</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((patient, index) => (
                            <tr key={index}>
                                <td align="left">
                                    {patient.id}
                                </td>
                                <td
                                    align="left"
                                    style={{
                                        display: 'flex',
                                        alignItems:
                                            'center',
                                    }}
                                >
                                    <Avatar
                                        src={
                                            patient.gender
                                                ? MalePatient
                                                : FemalePatient
                                        }
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            mr: 1,
                                        }}
                                    />
                                    {patient.name}
                                </td>
                                <td align="left">
                                    {patient.phone}
                                </td>
                                <td align="center">
                                    {patient.room}
                                </td>
                                <td align="center">
                                    {patient.time}
                                </td>
                                <td align="center">
                                    {patient.status}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </CustomPaper>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
