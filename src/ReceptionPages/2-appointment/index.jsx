import React, {useEffect} from 'react';
import Infomation from './infomation';
import Content from './content';
import AppoimentDemand from './rightbar';
import socket from '_services/socket.io'
import './index.scss'
// import PropTypes from 'prop-types';

function Appointment(props) {
    socket.on('AppointmentListChange',(appointment)=>{
        console.log(appointment)
    })
    return (
        <div className='appointment-container'>
            <Infomation></Infomation>
            <Content></Content>
            <AppoimentDemand></AppoimentDemand>
        </div>
    )
}

Appointment.propTypes = {

}

export default Appointment
