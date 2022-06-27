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
                    fullWidth
                    variant="filled"
                    label="Nhịp thở"
                    value={data.breathing_rate || ''}
                    size="small"
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontSize: '1.6rem',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1.6rem',
                        },
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Nhịp tim"
                    value={data.heart_rate || ''}
                    size="small"
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontSize: '1.6rem',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1.6rem',
                        },
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Huyết áp"
                    value={data.blood_pressure || ''}
                    size="small"
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontSize: '1.6rem',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1.6rem',
                        },
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Nhiệt độ"
                    value={data.temperature || ''}
                    size="small"
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontSize: '1.6rem',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1.6rem',
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Triệu chứng"
                    value={data.symptom || ''}
                    size="small"
                    multiline
                    rows={3}
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontSize: '1.6rem',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1.6rem',
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Chẩn đoán"
                    value={data.diagnosis || ''}
                    size="small"
                    multiline
                    rows={3}
                    sx={{
                        '& .MuiInputLabel-root': {
                            fontSize: '1.6rem',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1.6rem',
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
}

// PatientInfo.propTypes = {};

export default memo(ExaminingInfo);
