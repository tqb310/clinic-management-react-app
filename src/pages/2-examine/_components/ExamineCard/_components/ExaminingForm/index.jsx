import React, {useState, memo} from 'react';
import {FastField, Field} from 'formik';
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
import {
    hourSelect,
    minuteSelect,
    dayLength,
} from '_constants/date';
import './index.scss';

function ExaminingForm({form}) {
    const [isSetAppointment, setAppointment] =
        useState(false);
    const toggleAppointment = e => {
        if (!e.target.checked) {
            form.setFieldValue('follow_up_date', null);
            form.setFieldValue('follow_up_time.hour', '');
            form.setFieldValue('follow_up_time.minute', '');
        }
        setAppointment(e.target.checked);
    };
    return (
        <Grid
            container
            columnSpacing={2}
            className="ExaminingForm"
        >
            <Grid
                item
                xs={6}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="heart_rate"
                    id="heart_rate"
                    component={Input}
                    type="number"
                    label="Nhịp tim"
                />
            </Grid>
            <Grid
                item
                xs={6}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="blood_pressure"
                    id="blood_pressure"
                    component={Input}
                    type="number"
                    label="Huyết áp"
                />
            </Grid>
            <Grid
                item
                xs={6}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="temperature"
                    id="temperature"
                    component={Input}
                    type="number"
                    label="Nhiệt độ"
                />
            </Grid>
            <Grid
                item
                xs={6}
                className="ExaminingForm__symptom"
            >
                <FastField
                    name="breathing_rate"
                    id="breathing_rate"
                    component={Input}
                    type="number"
                    label="Nhịp thở"
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
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            size="small"
                            checked={isSetAppointment}
                            onChange={toggleAppointment}
                        />
                    }
                    label="Tái khám"
                    sx={{
                        '.MuiTypography-root': {
                            fontSize: 14.4,
                        },
                        my: '0.7rem',
                    }}
                />
            </Grid>
            {isSetAppointment && (
                <>
                    <Grid item xs={12}>
                        <FastField
                            name="follow_up_date"
                            id="follow_up_date"
                            label="Ngày tái khám"
                            component={DatePickerField}
                            minDate={
                                new Date(
                                    Date.now() + dayLength,
                                )
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="follow_up_time.hour"
                            id="follow_up_time.hour"
                            component={Select}
                            label="Giờ"
                            items={
                                form.values.follow_up_date
                                    ? hourSelect
                                    : []
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="follow_up_time.minute"
                            id="follow_up_time.minute"
                            component={Select}
                            label="Phút"
                            items={
                                form.values.follow_up_date
                                    ? minuteSelect
                                    : []
                            }
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default memo(ExaminingForm);
