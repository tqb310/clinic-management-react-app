import React, {memo, useMemo} from 'react';
import {Grid} from '@mui/material';
// import {KeyboardArrowDown} from "@mui/icons-material";
// import { CustomPaper } from "_components/shared/StyledComponent";
import Card from '_components/shared/Card';
import handlePriceFormat from '_helpers/handlePriceFormat';
// import {useSelector} from 'react-redux';
import './index.scss';
// import PropTypes from 'prop-types'

const cardInfo = [
    {
        title: 'Bệnh nhân',
        icon: 'user-injured',
        pdata: 0,
        cdata: 2.1,
        color: '#975ca8',
        bgColor: '#f9f2ff',
        key: 'patient',
        status: 'increasing',
    },
    {
        title: 'Doanh thu',
        icon: 'money-bill-wave',
        pdata: 0,
        cdata: 1.2,
        color: '#ffbc6e',
        bgColor: '#fff8ef',
        key: 'revenue',
        status: 'increasing',
    },
    {
        title: 'Cuộc hẹn',
        icon: 'calendar-check',
        pdata: 57,
        cdata: 2,
        color: '#14d153',
        bgColor: '#e5fff1',
        key: 'appointment',
        status: 'increasing',
    },
    {
        title: 'Dịch vụ khác',
        icon: 'medkit',
        pdata: 71,
        cdata: 2,
        color: '#21a6ff',
        bgColor: '#dbf0ff',
        key: 'otherServices',
        status: 'decreasing',
    },
];

function CardContainer({
    patientNumber,
    appointmentNumber,
    revenueData,
}) {
    const cardData = useMemo(() => {
        cardInfo[0].pdata = patientNumber;
        cardInfo[1].pdata =
            handlePriceFormat(revenueData) + ' đ';
        cardInfo[2].pdata = appointmentNumber;
        return cardInfo;
    }, [appointmentNumber, patientNumber, revenueData]);
    return (
        <div className="dashboardCard">
            <Grid
                container
                columnSpacing={4}
                className="dashboardCard__content"
            >
                {cardData.map((card, index) => (
                    <Grid item lg="3" key={index}>
                        <Card
                            ptitle={card.title}
                            pdata={card.pdata}
                            cdata={card.cdata}
                            icon={card.icon}
                            color={card.color}
                            bgColor={card.bgColor}
                            status={card.status}
                        ></Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

CardContainer.propTypes = {};

export default memo(CardContainer);
