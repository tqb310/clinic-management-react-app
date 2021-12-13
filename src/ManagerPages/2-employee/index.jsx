import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Header from './header';
import Body from './body';
import employeeData from '_constants/FakeData/Employee'
import { RightBar } from "_components/StyledComponent";
import EmployeeInfomation from './rightBar';
import './index.scss'

function Employee(props) {
    const [expandIndex, setExpandIndex] = useState(-1);
    const changeExpandIndex = (index) => {
        if (expandIndex == index) {
            setExpandIndex(-1)
        } else {
            setExpandIndex(index)
        }
    }
    return (
        <div className="manage-employee-wrap">
            <Header></Header>
            <Body
                className='manage-employee-wrap-body'
                employees={employeeData}
                expandIndex={expandIndex}
                handleExpandIndex={changeExpandIndex}
            ></Body>
            <RightBar>
                <EmployeeInfomation
                    employee={(expandIndex != -1) ? employeeData[expandIndex] : null}
                ></EmployeeInfomation>
            </RightBar>
        </div>
    )
}

Employee.propTypes = {

}

export default Employee

