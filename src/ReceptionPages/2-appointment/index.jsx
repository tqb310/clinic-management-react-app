import React from 'react';
import Infomation from './infomation';
import Content from './content';
import AppoimentDemand from './rightbar';
import BarChart from '_components/BarChart';
import './index.scss';
// import PropTypes from 'prop-types';

function Appointment(props) {
    return (
        <div className='appointment-container'>
            <div style={{width: '38%'}}>
                <Infomation />
                <BarChart/>
            </div>
            <div style={{width: '60%'}}>
                <Content />
            </div>
            <AppoimentDemand></AppoimentDemand>
        </div>
    )
}

Appointment.propTypes = {

}

export default Appointment
