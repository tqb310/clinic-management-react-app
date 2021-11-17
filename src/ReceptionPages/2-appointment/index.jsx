import React, { useEffect, useState } from 'react';
import Infomation from './infomation';
import Content from './content';
import AppoimentDemand from './rightbar';
import BarChart from '_components/BarChart';
import appointment from '_services/appointment.service';
import { dateParse } from '_constants/date';
import socket from '_services/socket.io'
import PieChart from '_components/PieChart';
import Form from './form'
import './index.scss';
import { Button } from '@mui/material';
// import PropTypes from 'prop-types';

function Appointment(props) {
    socket.on('AppointmentListChange', (appointment) => {
        console.log(appointment)
    })
    const [data, setData] = useState([])
    const [openForm, setOpenForm] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const today = new Date(Date.now())
            try {
                const dataApi = await appointment.getAppointmentByWeek(dateParse(today))
                switch (dataApi) {
                    case null: alert("Lỗi server, vui lòng thử lại"); break
                    case undefined: alert("Bạn không có quyền truy cập vào tính năng này!"); break
                    default: setData(dataApi)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='appointment-container'>
            <div style={{ width: '38%' }}>
                <Infomation />
                <BarChart />
                <PieChart />
            </div>
            <div style={{ width: '60%' }}>
                <Content data={data} />
                <Button variant="contained"
                    color="primary"
                    style={{
                        marginTop: '1.5rem',
                        marginLeft: '40%'
                    }}
                    onClick={()=>{setOpenForm(true)}}
                     >
                    Tạo lịch hẹn
                </Button>
            </div>
            <AppoimentDemand></AppoimentDemand>
            <Form open = {openForm}/>
        </div>
    )
}

Appointment.propTypes = {

}

export default Appointment
