import React from 'react';
import Infomation from './infomation';
import Content from './content';
import AppoimentDemand from './rightbar';
import './index.scss'
// import PropTypes from 'prop-types';

function Appointment(props) {
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
