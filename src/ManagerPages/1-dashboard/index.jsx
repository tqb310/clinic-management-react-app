import React from 'react';
import PieChart from './_component/PieChart'
import Card from './_component/card'
import analytis from '_constants/FakeData/ManageAnalytis'
import appointmentIcon from './assets/appointment.png'
import stackIcon from './assets/stack.png'
import requestIcon from './assets/request.png'
import doneIcon from './assets/done.png'
import BarChart from './_component/BarChart';
import { Bar } from "react-chartjs-2";


import './index.scss'
import Button from '@mui/material/Button'
// import PropTypes from 'prop-types'

function Dashboard(props) {
    return (
        <div className='manage-dashboard-container'>
            <div className='manage-chart-grid-container'>
                <PieChart className='manage-chart-grid-element'></PieChart>
                <div className='manage-chart-grid-element manage-chart-grid-element-right'>
                    <div className='manage-chart-grid-element-first-row'>
                        <Card name="Cuộc hẹn trong ngày" data={analytis.cuocHen} color='#f54040' icon={appointmentIcon}></Card>
                        <Card name="Hàng đợi" data={analytis.hangDoi} color='blue' icon={stackIcon}></Card>
                    </div>
                    <div className='manage-chart-grid-element-first-row'>
                        <Card style={{ width: '40% impotant!' }} name="Yêu cầu" data={analytis.yeuCau} color='purple' icon={requestIcon}></Card>
                        <Card name="Đã khám" data={analytis.daKham} color='green' icon={doneIcon}></Card>
                    </div>
                </div>
            </div>
            <div className='manage-barchar'>
                <BarChart></BarChart>
                <div className='button'>
                    <Button variant="contained" color="primary">
                        Xuất file excel
                    </Button>
                </div>

            </div>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard

