import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {dateMap, dayLength} from '_constants/date'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const data = [{
    time: '8:30',
    type: 'Tái khám',
    name: 'Nguyễn Văn A',
    doctor: 'BS. Phúc'
},
{
    time: '8:30',
    type: 'Tái khám',
    name: 'Nguyễn Văn A',
    doctor: 'BS. Phúc'
},
{
    time: '8:30',
    type: 'Tái khám',
    name: 'Nguyễn Văn A',
    doctor: 'BS. Phúc'
}, {
    time: '8:30',
    type: 'Tái khám',
    name: 'Nguyễn Văn A',
    doctor: 'BS. Phúc'
}, {
    time: '8:30',
    type: 'Tái khám',
    name: 'Nguyễn Văn A',
    doctor: 'BS. Phúc'
}, {
    time: '8:30',
    type: 'Tái khám',
    name: 'Nguyễn Văn A',
    doctor: 'BS. Phúc'
}]
function Content() {
    const [today, setToday] = useState(new Date(Date.now()))
    const [dayActive, setDayActive] = useState(6)
    const dates = []
    for(let i = -6;i<=6;i++){
        dates.push(new Date(today.getTime() + i*dayLength))
    }
    return (
        <div className='content-container'>
            <div className='content-header'>
                <h3>Lịch hẹn</h3>
                <div className='search-bar'>
                    <FontAwesomeIcon icon='search' className='appointment-search-icon' />
                    <input type='text' placeholder='Tìm Kiếm' />
                </div>
                <div className='month'>
                    <h3>10/ 2021</h3>
                    <FontAwesomeIcon icon='chevron-circle-left' className='chevron-circle-left-icon' />
                    <FontAwesomeIcon icon='chevron-circle-right' className='chevron-circle-right-icon' />
                </div>
            </div>
            <div className='dates'>
                 {dates.map((date,index) =>
                    <div className={(dayActive == index)? 'date--active' : 'date'}>
                        <p>{dateMap.get(date.getDay())}</p>
                        <p>{date.getDate()}</p>
                    </div>
                )} 
            </div>

            <div className='appointment-container'>
                <Scrollbars style={{ width: '100%', height: 350 }}>
                    {data.map(appointment =>
                        <div className='appointment'>
                            <div className='appointment-header'>
                                <h2>{appointment.time}</h2>
                                <p>{appointment.type}</p>
                            </div>
                            <div className='appointment-body'>
                                <div>
                                    <h4>{appointment.name}</h4>
                                    <p>{appointment.doctor}</p>
                                </div>
                                <FontAwesomeIcon icon='ellipsis-v'></FontAwesomeIcon>
                            </div>
                        </div>
                    )}
                </Scrollbars>
            </div>
        </div>
    )
}

export default Content
