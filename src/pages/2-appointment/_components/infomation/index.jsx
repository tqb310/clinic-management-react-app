import React, {memo} from 'react';
import './index.scss';
import lich from './assets/lich.jpg';
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
                        width={56}
                        height={56}
                    />
                    <div className="text-wrapper">
                        <Typography
                            variant="h4"
                            className="greendark"
                        >
                            51
                        </Typography>
                        <h5>Sắp tới</h5>
                    </div>
                </CustomPaper>
            </Grid>
            <Grid item lg={6}>
                <CustomPaper className="card">
                    <img
                        src={huylich}
                        alt="lich-huy-logo"
                        width={56}
                        height={56}
                    />
                    <div className="text-wrapper">
                        <Typography
                            variant="h4"
                            className="reddark"
                        >
                            7
                        </Typography>
                        <h5>Đã hủy</h5>
                    </div>
                </CustomPaper>
            </Grid>
        </Grid>
    );
}

export default memo(Infomation);
