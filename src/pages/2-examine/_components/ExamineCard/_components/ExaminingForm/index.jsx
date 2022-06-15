import React, {useState, memo} from 'react';
import {FastField} from 'formik';
import {
    TextArea,
    Input,
    DatePickerField,
    Select,
} from '_components/shared/FormikField';
import {
    FormControlLabel,
    Switch,
    // Button,
    Grid,
} from '@mui/material';
import {hourSelect, minuteSelect} from '_constants/date';
import './index.scss';

function ExaminingForm() {
    const [isSetAppointment, setAppointment] =
        useState(false);
    return (
        <Grid
            container
            columnSpacing={2}
            className="ExaminingForm"
        >
            <Grid
                item
                xs={3}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="heart_rate"
                    id="heart_rate"
                    component={Input}
                    type="number"
                    label="Nhịp tim"
                    required
                />
            </Grid>
            <Grid
                item
                xs={3}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="blood_pressure"
                    id="blood_pressure"
                    component={Input}
                    type="number"
                    label="Huyết áp"
                    required
                />
            </Grid>
            <Grid
                item
                xs={3}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="temperature"
                    id="temperature"
                    component={Input}
                    type="number"
                    label="Nhiệt độ"
                    required
                />
            </Grid>
            <Grid
                item
                xs={3}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="breathing_rate"
                    id="breathing_rate"
                    component={Input}
                    type="number"
                    label="Nhịp thở"
                    required
                />
            </Grid>
            <Grid
                item
                xs={12}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="symptom"
                    id="symptom"
                    component={TextArea}
                    label="Triệu chứng"
                    rows="2"
                    required
                />
            </Grid>
            <Grid
                item
                xs={12}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="diagnosis"
                    id="diagnosis"
                    component={TextArea}
                    label="Chẩn đoán"
                    rows="2"
                    required
                />
            </Grid>
            <Grid item xs={3}>
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={isSetAppointment}
                            onChange={e =>
                                setAppointment(
                                    e.target.checked,
                                )
                            }
                        />
                    }
                    label="Tái khám"
                    sx={{
                        '.MuiTypography-root': {
                            fontSize: 14.4,
                        },
                        marginTop: '.7rem',
                    }}
                />
            </Grid>
            {isSetAppointment && (
                <>
                    <Grid item xs={3}>
                        <FastField
                            name="follow_up_date"
                            id="follow_up_date"
                            label="Ngày tái khám"
                            component={DatePickerField}
                            minDate={new Date()}
                            required
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FastField
                            name="follow_up_time.hour"
                            id="follow_up_time.hour"
                            component={Select}
                            label="Giờ"
                            items={hourSelect}
                            required
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FastField
                            name="follow_up_time.minute"
                            id="follow_up_time.minute"
                            component={Select}
                            label="Phút"
                            items={minuteSelect}
                            required
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default memo(ExaminingForm);
