import React from "react";
import { CustomPaper } from "_components/StyledComponent";
import "./index.scss";
// import PropTypes from 'prop-types'

function RoomState(props) {
  return (
    <CustomPaper className="RoomState">
      <div className="RoomState__title">Tình trạng các phòng</div>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="statusDot available"></div>
            </td>
            <td>
              <p className="room">Phòng 1</p>
              <p className="doctor">BS.Phúc</p>
            </td>
            <td>#24 Nguyễn Văn Vĩnh</td>
          </tr>
          <tr>
            <td>
              <div className="statusDot available"></div>
            </td>
            <td>
              <p className="room">Siêu âm</p>
              {/* <p className="doctor">BS.Ly</p> */}
            </td>
            <td>#23 Hoàng Tuấn</td>
          </tr>
          <tr>
            <td>
              <div className="statusDot available"></div>
            </td>
            <td>
              <p className="room">Xét nghiệm máu</p>
              {/* <p className="doctor">BS.Ly</p> */}
            </td>
            <td>#25 Võ Nguyên Lực</td>
          </tr>
          <tr>
            <td>
              <div className="statusDot non-available"></div>
            </td>
            <td>
              <p className="room">Phòng 2</p>
              <p className="doctor">BS.Ly</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <div className="statusDot non-available"></div>
            </td>
            <td>
              <p className="room">Chụp X quang</p>
              {/* <p className="doctor">BS.Ly</p> */}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </CustomPaper>
  );
}

RoomState.propTypes = {};

export default RoomState;
