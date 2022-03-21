import React from "react";
import { CustomPaper } from "_components/shared/StyledComponent";
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
            <td>Nguyễn Văn Hải Long</td>
            <td>0923456789</td>
            <td>1</td>
            <td>9:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Hoàng Văn Vĩnh</td>
            <td>0988989891</td>
            <td>1</td>
            <td>9:45</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Đinh Hoàng Nguyên</td>
            <td>0374646382</td>
            <td>1</td>
            <td>10:00</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Võ Văn Thanh</td>
            <td>0900898876</td>
            <td>1</td>
            <td>10:15</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Lê Tấn Phát</td>
            <td>0907875747</td>
            <td>1</td>
            <td>10:30</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Nguyễn Vinh Thắng</td>
            <td>0989888736</td>
            <td>1</td>
            <td>10:45</td>
            <td>Chưa khám</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Đặng Hoàng Nguyên</td>
            <td>098573747</td>
            <td>1</td>
            <td>11:00</td>
            <td>Chưa khám</td>
          </tr>
        </tbody>
      </table>
    </CustomPaper>
  );
}

Appointment.propTypes = {};

export default Appointment;
