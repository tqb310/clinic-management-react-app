import React, {memo} from 'react';
import Infomation from './_components/infomation';
import Content from './_components/AppointmentTable';
import RightBar from './_components/RightBar';
import BarChart from '_components/shared/BarChart';
import {Grid} from '@mui/material';
// import appointment from '_services/appointment.service';
// import {dateParse} from '_constants/date';
// import socket from '_services/socket.io';
import PieChart from '_components/shared/PieChart';
import './index.scss';
// import PropTypes from 'prop-types';
// const data = [
//     {id: 1, TIMES: new Date(), TYPE: 1, PATIENT_NAME: 'Nguyễn Văn A', EMPLOYEE_NAME: 'Phúc'}
// ];
const data = [
    {key: 'Hai', value: 9},
    {key: 'Ba', value: 12},
    {key: 'Tư', value: 4},
    {key: 'Năm', value: 7},
    {key: 'Sáu', value: 11},
    {key: 'Bảy', value: 21},
    {key: 'CN', value: 17},
];
function Appointment(props) {
    // socket.on('AppointmentListChange', appointment => {
    //     console.log(appointment);
    // });
    // const [data, setData] = useState([]);
    // console.log(data);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const today = new Date(Date.now());
    //         try {
    //             const dataApi = await appointment.getAppointmentByWeek(dateParse(today));
    //             console.log(dataApi);
    //             switch (dataApi) {
    //                 case null: break;
    //                 case undefined: alert("Bạn không có quyền truy cập vào tính năng này!"); break
    //                 default: setData(dataApi)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData();
    // }, [])

    return (
        <Grid
            container
            spacing={3}
            className="appointment-container"
        >
            <Grid item lg={5}>
                <Infomation />
                <BarChart
                    title="Số lượng lịch hẹn trong tuần"
                    height={250}
                    yAxis={[0, 5, 10, 15, 20]}
                    data={data}
                    widthItem={33}
                />
                <PieChart />
            </Grid>
            <Grid item lg={7}>
                <Content data={data} />
            </Grid>
            <RightBar></RightBar>
        </Grid>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
