import React, {memo} from "react";
import { Grid } from "@mui/material";
// import {KeyboardArrowDown} from "@mui/icons-material";
// import { CustomPaper } from "_components/shared/StyledComponent";
import Card from "_components/shared/Card";
import "./index.scss";
// import PropTypes from 'prop-types'

const cardInfo = [
  {
    title: "Bệnh nhân",
    pdata: "54",
    cdata: "2",
    icon: "user-injured",
    color: "#975ca8",
    bgColor: "#f9f2ff",
  },
  {
    title: "Doanh thu",
    pdata: "2,000,000",
    cdata: "2",
    icon: "money-bill-wave",
    color: "#ffbc6e",
    bgColor: "#fff8ef",
  },
  {
    title: "Cuộc hẹn",
    pdata: "25",
    cdata: "2",
    icon: "calendar-check",
    color: "#14d153",
    bgColor: "#e5fff1",
  },
  {
    title: "Dịch vụ khác",
    pdata: "25",
    cdata: "2",
    icon: "medkit",
    color: "#21a6ff",
    bgColor: "#dbf0ff",
  },
];

function CardContainer() {
  return (
    <div className="dashboardCard">
      {/* <div className="dashboardCard__select">
        <Button
          sx={{
            color: "#25282B",
            textTransform: "capitalize",
            padding: 0,
            fontSize: 13,
            textAlign: "center",
            marginTop: '.2rem',
            fontWeight: 500
          }}
          endIcon={<KeyboardArrowDown style={{ color: "#2E3192" }} />}
        >
          Hôm nay
        </Button>
      </div> */}
      <Grid container columnSpacing={4} className="dashboardCard__content">
        {cardInfo.map((card, index) => (
          <Grid item lg="3" key={index}>
            <Card              
              ptitle={card.title}
              pdata={card.pdata}
              cdata={card.cdata}
              icon={card.icon}
              color={card.color}
              bgColor={card.bgColor}
            ></Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

CardContainer.propTypes = {};

export default memo(CardContainer);
