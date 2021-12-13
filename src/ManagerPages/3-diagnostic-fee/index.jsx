import React,{useState} from 'react'
import PieChart from './_components/PieChart'
import BarChart from './_components/BarChart'
import services from '_constants/FakeData/Service'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './index.scss'
function DiagnosticFee() {
    const [selectIndex, setSelectIndex] = useState(-1)
    return (
        <div className='manage-fee'>
            <div className='manage-fee-card-chart'>
                {/* <Card name='Dịch vụ' data='8' color='#349873' icon={serviceIcon}></Card> */}
                <PieChart></PieChart>
                <BarChart></BarChart>
            </div>
            <div className='manage-fee-right'>
                <div className='manage-fee-right-table'>
                    <p className='manage-fee-right-table-title'>DANH SÁCH DỊCH VỤ</p>
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>Tên dịch vụ</th>
                            <th>Chi phí (VND)</th>
                        </tr>
                        {services.map((service,index)=>
                            <tr className={index == selectIndex? 'manage-fee-right-table-row-active' : ''} onClick={()=>setSelectIndex(index)}>
                                <td>{index+1}</td>
                                <td>{service.NAME}</td>
                                <td>{service.FEE}</td>
                            </tr>
                        )}
                        <tr>
                            <td></td>
                            <td></td>
                            <td><FontAwesomeIcon icon='plus'></FontAwesomeIcon>Thêm</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DiagnosticFee
