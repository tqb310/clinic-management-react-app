import React from "react";
import { EventAvailable } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateParse } from '_constants/date'
import "./index.scss";
// import PropTypes from 'prop-types'

function CardInfor({ createAt, type, doctor, status }) {
  return (
    <div className="CardInfor">
      <p className="title">
        <EventAvailable className="CardInfor__icon" />
        Ngày tạo
      </p>
      <p>{dateParse(new Date(createAt.slice(0, 22)))}</p>
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
      <p className="link">{type}</p>
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
      <p>{doctor}</p>
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
      <p className="CardInfor__last in-process">{status}</p>
    </div>
  );
}

CardInfor.propTypes = {};

export default CardInfor;
