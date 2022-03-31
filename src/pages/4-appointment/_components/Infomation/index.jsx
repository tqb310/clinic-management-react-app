import React, {memo} from 'react';
import './index.scss';
import lich from './assets/lich.png';
import huylich from './assets/huylich.png';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Grid, Typography} from '@mui/material';

function Infomation() {
    return (
        <Grid
            container
            columnSpacing={3}
            className="card-wrapper"
        >
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={lich}
                        alt="lich-logo"
                        width={40}
                        height={40}
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
                            1234
                        </Typography>
                    </div>
                </CustomPaper>
            </Grid>
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={huylich}
                        alt="lich-huy-logo"
                        width={40}
                        height={40}
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
                            234
                        </Typography>
                    </div>
                </CustomPaper>
            </Grid>
        </Grid>
    );
}

export default memo(Infomation);
