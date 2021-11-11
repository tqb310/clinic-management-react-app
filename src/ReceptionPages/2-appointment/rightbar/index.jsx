import React from 'react'
import { RightBar } from '_components/StyledComponent/RightBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import './index.scss'

const datas = [
    {
        createAt: '27p trước',
        name: 'Bành Thị Y',
        phone: '0123456789',
        time: 'Ngày mai'
    },
    {
        createAt: '27p trước',
        name: 'Bành Thị Y',
        phone: '0123456789',
        time: 'Ngày mai'
    }, {
        createAt: '27p trước',
        name: 'Bành Thị Y',
        phone: '0123456789',
        time: 'Ngày mai'
    }, {
        createAt: '27p trước',
        name: 'Bành Thị Y',
        phone: '0123456789',
        time: 'Ngày mai'
    }
]
function AppointmentDemand() {
    return (
        <RightBar>
            <div className="appointment-demand-header">
                <h2>Yêu cầu lịch hẹn</h2>
            </div>
            <table className="appoinment-rightbar-content">
                {datas.map(data =>
                    <tr>
                        <td>{data.createAt}</td>
                        <td>
                            <div className='name-and-phone'>
                                <p>{data.name}</p>
                                <p>{data.phone}</p>
                            </div>
                        </td>
                        <td>{data.time}</td>
                        <td>
                            <IconButton className='eye-button'>
                                <FontAwesomeIcon icon='eye' />
                            </IconButton>
                        </td>
                    </tr>
                )}

            </table>

        </RightBar>
    )
}

export default AppointmentDemand
