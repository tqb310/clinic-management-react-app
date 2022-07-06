import React, {memo} from 'react';
import './index.scss';
import lich from './assets/lich.png';
import huylich from './assets/huylich.png';
import visited from './assets/visited.png';
import notVisited from './assets/notVisited.png';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Grid, Typography} from '@mui/material';

function Infomation({
    appointmentNumber,
    cancelledNumber,
    notVisitedNumber,
    visitedNumber,
}) {
    return (
        <Grid
            container
            spacing={3}
            className="card-wrapper"
        >
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={lich}
                        alt="lich"
                        width={48}
                        height={48}
                    />
                    <div className="text-wrapper">
                        <Typography
                            variant="body1"
                            color="#999"
                        >
                            Tổng số cuộc hẹn
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {appointmentNumber}
                        </Typography>
                    </div>
                </CustomPaper>
            </Grid>
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={huylich}
                        alt="lich huy"
                        width={48}
                        height={48}
                    />
                    <div className="text-wrapper">
                        <Typography
                            variant="body1"
                            color="#999"
                        >
                            Cuộc hẹn đã hủy
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {cancelledNumber}
                        </Typography>
                    </div>
                </CustomPaper>
            </Grid>
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={visited}
                        alt="Cuoc hen da kham"
                        width={48}
                        height={48}
                    />
                    <div className="text-wrapper">
                        <Typography
                            variant="body1"
                            color="#999"
                        >
                            Đã đến khám
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {visitedNumber}
                        </Typography>
                    </div>
                </CustomPaper>
            </Grid>
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={notVisited}
                        alt="Cuoc hen chua kham"
                        width={48}
                        height={48}
                    />
                    <div className="text-wrapper">
                        <Typography
                            variant="body1"
                            color="#999"
                        >
                            Chưa đến khám
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {notVisitedNumber}
                        </Typography>
                    </div>
                </CustomPaper>
            </Grid>
        </Grid>
    );
}

export default memo(Infomation);
