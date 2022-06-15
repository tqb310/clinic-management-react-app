import React, {memo} from 'react';
import {TextField, Grid} from '@mui/material';
// import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types'

function ExaminingInfo(props) {
    return (
        <Grid
            container
            columnSpacing={2}
            className="RCExaminingInfo"
        >
            <Grid
                item
                xs={4}
                className="RCExaminingInfo__name"
            >
                <TextField
                    variant="filled"
                    label="Mạch"
                    value="80"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid
                item
                xs={4}
                className="RCExaminingInfo__birthdate"
            >
                <TextField
                    variant="filled"
                    label="Huyết áp"
                    value="110"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid
                item
                xs={4}
                className="RCExaminingInfo__age"
            >
                <TextField
                    variant="filled"
                    label="Nhiệt độ"
                    value="37.5"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
                className="RCExaminingInfo__gender"
            >
                <TextField
                    variant="filled"
                    label="Triệu chứng"
                    value="Đau bụng dữ dội"
                    size="small"
                    sx={{
                        '& .MuiInputBase-input': {},
                        width: '100%',
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
                className="RCExaminingInfo__phone"
            >
                <TextField
                    variant="filled"
                    label="Chẩn đoán"
                    value="Viêm bao tử"
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
