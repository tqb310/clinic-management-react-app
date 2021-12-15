import React from 'react'
import {genderMap} from '_constants/gender'
import './index.scss'
import Button from '@mui/material/Button'

import { createTheme } from '@mui/material/styles';

function EmployeeInfomation({employee}) {
    return (
        <div className='manage-employee-infomation'>
            <p className='manage-employee-infomation-title'>Thông tin nhân viên</p>
            {(employee != null) &&(
                <div>
                <p><span>Mã nhân viên:</span> {employee.EMPLOYEE_ID}</p>
                <p><span>Họ và tên:</span> {employee.EMPLOYEE_NAME}</p>
                <p><span>CMND / CCCD:</span> {employee.IDENTITY_NUMBER}</p>
                <p><span>Số điện thoại:</span> {employee.PHONE}</p>
                <p><span>Giới tính:</span> {genderMap.get(employee.GENDER)}</p>
                <p><span>Ngày sinh:</span> {employee.DATE_OF_BIRTH}</p>
                <p><span>Địa chỉ:</span> {employee.ADDRESS}</p>
                <p><span>Vị trí:</span> {employee.POSITION}</p>
                <p><span>Ngày bắt đầu:</span> {employee.START_WORK_DATE}</p>
                <p><span>Lương:</span> {employee.SALARY} VND</p>
                <button className='manage-employee-infomation-change'>Chỉnh sửa</button>
                </div>
            )}
        </div>
    )
}

export default EmployeeInfomation
