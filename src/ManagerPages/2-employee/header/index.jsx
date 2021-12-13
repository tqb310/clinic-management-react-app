import React from 'react'
import Card from './card'
import employeeNumber from './asset/group.png'
import receptionist from './asset/reception.png'
import doctor from './asset/doctor.png'
import hiring from './asset/loudspeaker.png'
import './index.scss'

const data = {
    soluong: 123,
    tieptan: 23,
    bacsi: 100,
    tuyendung: 10
}
function Header({ }) {
    return (
        <div className="header-wrap">
            <Card name="Số lượng" data={data.soluong} color='#f54040' icon={employeeNumber}></Card>
            <Card name="Tiếp tân" data={data.tieptan} color='blue' icon={receptionist}></Card>
            <Card name="Bác sĩ" data={data.bacsi} color='purple' icon={doctor}></Card>
            <Card name="Tuyển dụng" data={data.tuyendung} color='green' icon={hiring}></Card>
        </div>
    )
}

Header.propTypes = {

}
export default Header
