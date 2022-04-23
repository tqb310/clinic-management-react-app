import React, {useState, memo} from 'react';
// import {data} from "_constants/FakeData/AppointmentRequest";
import {Typography} from '@mui/material';
// import {today} from '_constants/date';
import RequestItem from './_components/RequestItem';
import {Scrollbars} from 'react-custom-scrollbars-2';
// import ConfirmRequest from '../ConfirmRequest';

import './index.scss';

// function RequestContent({data, onClick}) {
//     const timeParse = dateTime => {
//         const milisecond =
//             today -
//             new Date(dateTime.slice(0, 22)).getTime();
//         const hour =
//             (milisecond - (milisecond % 3600000)) / 3600000;
//         const min = Math.floor(
//             (milisecond % 3600000) / 60000,
//         );
//         return (
//             (hour > 0 ? `${hour} giờ ` : '') +
//             (min > 0 ? `${min} phút trước` : 'trước')
//         );
//     };
//     return (
//         <table className="appoinment-rightbar-content">
//             {data.map(d => (
//                 <tr
//                     className={
//                         d.STATUS === 1 ? 'unread' : ''
//                     }
//                     onClick={() => onClick(d)}
//                 >
//                     <td>{timeParse(d.CREATE_AT)}</td>
//                     <td>
//                         <p>{d.PATIENT_NAME}</p>
//                         <p>{d.PHONE}</p>
//                     </td>
//                 </tr>
//             ))}
//         </table>
//     );
// }

function AppointmentDemand({sx}) {
    // const [data, setData] = useState([]);
    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const dataToday = data.filter(
    //     d =>
    //         new Date(d.CREATE_AT.slice(0, 22)).getDate() ===
    //         new Date(Date.now()).getDate(),
    // );
    // const oldData = data.filter(
    //     d =>
    //         new Date(d.CREATE_AT.slice(0, 22)).getDate() !==
    //         new Date(Date.now()).getDate(),
    // );
    return (
        <div className="appointment-demand">
            <Typography
                variant="h5"
                className="appointment-demand__title"
            >
                Yêu cầu đặt lịch hẹn
            </Typography>
            <div className="appointment-demand__tab">
                <div className="appointment-demand__tab-item active">
                    Gần đây (20)
                </div>
                <div className="appointment-demand__tab-item">
                    Vừa duyệt (5)
                </div>
                <div className="appointment-demand__tab-item">
                    Chưa duyệt (0)
                </div>
            </div>
            <Scrollbars
                style={{width: '100%', height: '85%'}}
                autoHide={true}
            >
                <RequestItem
                    patientName="Truong Yen Trang"
                    phone="012346789"
                    timeStamp="12 phut truoc"
                    gender="0"
                    date="27/03/2022"
                    time="7:30 - 7:45"
                />
                <RequestItem
                    patientName="Nguyen Van Bang"
                    phone="012346789"
                    timeStamp="12 phut truoc"
                    gender="1"
                    date="27/03/2022"
                    time="7:30 - 7:45"
                />
                <RequestItem
                    patientName="Truong Yen Trang"
                    phone="012346789"
                    timeStamp="12 phut truoc"
                    gender="0"
                    date="27/03/2022"
                    time="7:30 - 7:45"
                />
                <RequestItem
                    patientName="Truong Yen Trang"
                    phone="012346789"
                    timeStamp="12 phut truoc"
                    gender="0"
                    date="27/03/2022"
                    time="7:30 - 7:45"
                />
            </Scrollbars>
        </div>
    );
}

export default memo(AppointmentDemand);
