import React from "react";
import { CustomPaper } from "_components/StyledComponent";
import "./index.scss";
// import PropTypes from 'prop-types'

function Appointment(props) {
  return (
    <CustomPaper className="Appointment">
      <div className="Appointment__title">Lịch hẹn hôm nay</div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Phòng khám</th>
            <th>Giờ</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>        
          <tr>
            <td>3</td>
            <td>Nguyễn Văn A</td>
            <td>0123456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>        
        </tbody>
      </table>
    </CustomPaper>
  );
}

Appointment.propTypes = {};

export default Appointment;
