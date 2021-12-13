import React from "react";
import { EventAvailable } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
// import PropTypes from 'prop-types'

function CardInfor(props) {
  return (
    <div className="CardInfor">
      <p className="title">
        <EventAvailable className="CardInfor__icon" />
        Ngày tạo
      </p>
      <p>01/01/2021</p>
      <p className="title">
        <FontAwesomeIcon
          icon="stethoscope"
          style={{
            marginRight: "0.3rem",
            fontSize: "0.75rem",
            transform: "translateY(-0.08rem)",
          }}
        />
        Loại
      </p>
      <p className="link">Tái khám - 123456788</p>
      <p className="title">
        <FontAwesomeIcon
          icon="user-md"
          style={{
            marginRight: "0.3rem",
            fontSize: "0.75rem",
            transform: "translateY(-0.08rem)",
          }}
        />
        Bác sĩ
      </p>
      <p>Nguyễn Văn B</p>
      <p className="CardInfor__last title">
        <FontAwesomeIcon
          icon="spinner"
          style={{
            marginRight: "0.3rem",
            fontSize: "0.75rem",
            transform: "translateY(-0.08rem)",
          }}
        />
        Trạng thái
      </p>
      <p className="CardInfor__last in-process">Chưa hoàn tất</p>
    </div>
  );
}

CardInfor.propTypes = {};

export default CardInfor;
