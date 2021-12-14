import React, {useState} from 'react'
import {genderMap} from '_constants/gender'
import './index.scss'

function Body({employees, expandIndex, handleExpandIndex}) {
    
    return (
        <div className='manage-employee-body'>
            <p className='manage-employee-body-title'>DANH SÁCH NHÂN VIÊN</p>
            <table>
                <tr>
                    <th>Mã nhân viên</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Vị trí</th>
                    <th>Lương</th>
                </tr>
                {employees.map((employee, index)=>[
                    <tr onClick={()=>handleExpandIndex(index)}>
                        <td className='manage-employee-id'>{employee.EMPLOYEE_ID}</td>
                        <td className='manage-employee-name'>{employee.EMPLOYEE_NAME}</td>
                        <td className='manage-employee-phone'>{employee.PHONE}</td>
                        <td className='manage-employee-position'>{employee.POSITION}</td>
                        <td className='manage-employee-salary'>{employee.SALARY}</td>
                    </tr>,
                    // (expandIndex == index) && (
                    //     <tr>
                    //         <td>{employee.IDENTITY_NUMBER}</td>
                    //         <td>{genderMap.get(employee.GENDER)}</td>
                    //         <td>{employee.DATE_OF_BIRTH}</td>
                    //         <td>{employee.ADDRESS}</td>
                    //         <td>{employee.START_WORK_DATE}</td>
                    //     </tr>
                    // )
                ]
                )}
            </table>
        </div>
    )
}

export default Body
