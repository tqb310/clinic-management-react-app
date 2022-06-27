import React, {memo} from 'react';
import {TextField, Grid} from '@mui/material';
// import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function ExaminingInfo({data}) {
    return (
        <Grid
            container
            spacing={2}
            className="RCExaminingInfo"
        >
            <Grid item xs={3}>
                <TextField
                    variant="filled"
                    label="Nhịp thở"
                    value={data.breathing_rate || ''}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="filled"
                    label="Nhịp tim"
                    value={data.heart_rate || ''}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="filled"
                    label="Huyết áp"
                    value={data.blood_pressure || ''}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="filled"
                    label="Nhiệt độ"
                    value={data.temperature || ''}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="filled"
                    label="Triệu chứng"
                    value={data.symptom || ''}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="filled"
                    label="Chẩn đoán"
                    value={data.diagnosis || ''}
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
        </Grid>
    );
}

// PatientInfo.propTypes = {};

export default memo(ExaminingInfo);
