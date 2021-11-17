import React, { useState } from "react";
// import { Scrollbars } from 'react-custom-scrollbars-2';

import { dateMap, dayLength } from '_constants/date'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Content(props) {
    const [today, setToday] = useState(new Date(Date.now()))
    const [dayActive, setDayActive] = useState(today.getDay())
    const dates = []
    for (let i = 0; i <= 6; i++) {
        dates.push(new Date(today.getTime() + (i - today.getDay()) * dayLength))
    }
    const dayActiveChange = (index) => {
        setDayActive(index)
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
            <div className="dates-container">
                <div className='dates'>
                    {dates.map((date, index) =>
                        <div className={(dayActive === index ? 'date--active' : (index == today.getDay())? 'today':'date') + ((props.data.filter(d=>(new Date(d.TIMES)).getDay() == index).length > 0) ? " dot-notify" : "")} onClick={()=>dayActiveChange(index)}>
                            <p>{dateMap.get(date.getDay())}</p>
                            <p>{date.getDate()}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className='appointment-container'>
                {/* <Scrollbars style={{ width: '100%', height: 350 }}> */}
                {props.data.filter(appointment=>(new Date(appointment.TIMES)).getDay() == dayActive).map(appointment =>
                    <div className='appointment'>
                        <div className='appointment-header'>
                            <h3>
                                {`${('0' + (new Date(appointment.TIMES.slice(0, 21))).getHours()).slice(-2)}:${('0' + (new Date(appointment.TIMES.slice(0, 21))).getMinutes()).slice(-2)}`}
                            </h3>
                            <p>{(appointment.TYPE) ? 'Tái Khám' : 'Khám mới'}</p>
                        </div>
                        <div className='appointment-body'>
                            <div>
                                <h4>{appointment.PATIENT_NAME}</h4>
                                <p>{`BS. ${appointment.EMPLOYEE_NAME}`}</p>
                            </div>
                            <FontAwesomeIcon icon='ellipsis-v'></FontAwesomeIcon>
                        </div>
                    </div>
                )}
                {/* </Scrollbars> */}
            </div>
        </div >
    )
}

export default Content;
