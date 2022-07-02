import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {
    Button,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import General from './_components/General';
import DateTimeChoice from './_components/DateTime';
import appointmentSchema from '_validations/appointmentSchema';
import {LoadingButton} from '@mui/lab';
import './index.scss';

function FormikStep({children}) {
    return <div>{children}</div>;
}

function FormikStepper({children, onSubmit, ...rest}) {
    const childrenArray = React.Children.toArray(children);
    const [currentTab, setCurrentTab] = useState(0);
    const currentChild = childrenArray[currentTab];
    // console.log(currentChild);
    return (
        <Formik
            {...rest}
            onSubmit={async (values, helpers) => {
                try {
                    if (
                        currentTab ===
                        childrenArray.length - 1
                    ) {
                        helpers.setSubmitting(true);
                        await onSubmit(values, helpers);
                    } else {
                        setCurrentTab(currentTab + 1);
                    }
                } catch (error) {
                    throw error;
                } finally {
                    helpers.setSubmitting(false);
                }
            }}
            validationSchema={
                currentChild.props.validationSchema
            }
        >
            {form => {
                // console.log(form);
                return (
                    <Form>
                        <Stepper
                            activeStep={currentTab}
                            alternativeLabel
                            sx={{marginBottom: '2rem'}}
                        >
                            {childrenArray.map(
                                (child, index) => (
                                    <Step
                                        key={
                                            child.props
                                                .label
                                        }
                                    >
                                        <span
                                            style={{
                                                width: '117px',
                                                borderBottom:
                                                    '1px solid #bdbdbd',
                                                position:
                                                    'absolute',
                                                top: '20%',
                                                left:
                                                    index ===
                                                        0 &&
                                                    0,
                                                right:
                                                    index ===
                                                        childrenArray.length -
                                                            1 &&
                                                    0,
                                            }}
                                        ></span>
                                        <StepLabel
                                            sx={{
                                                '& .Mui-active':
                                                    {
                                                        color: '#2E3192 !important',
                                                    },
                                                '& .Mui-completed':
                                                    {
                                                        color: '#2E3192 !important',
                                                    },
                                            }}
                                        >
                                            {
                                                child.props
                                                    .label
                                            }
                                        </StepLabel>
                                    </Step>
                                ),
                            )}
                        </Stepper>
                        {currentChild}
                        <div className="AppointmentForm__actions">
                            {currentTab > 0 && (
                                <Button
                                    disabled={!form.dirty}
                                    onClick={() =>
                                        setCurrentTab(
                                            currentTab - 1,
                                        )
                                    }
                                    sx={{
                                        color: '#2E3192',
                                        mr: '1rem',
                                        width: 160,
                                        '&:hover': {
                                            backgroundColor:
                                                '#e8e8fc',
                                        },
                                    }}
                                >
                                    Trở lại
                                </Button>
                            )}
                            <LoadingButton
                                type="submit"
                                loading={form.isSubmitting}
                                disabled={!form.dirty}
                                variant="contained"
                                sx={{
                                    backgroundColor:
                                        '#2E3192',
                                    width: 160,
                                    '&:hover': {
                                        backgroundColor:
                                            '#111589',
                                    },
                                }}
                            >
                                {currentTab ===
                                childrenArray.length - 1
                                    ? 'Tạo'
                                    : 'Tiếp tục'}
                            </LoadingButton>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

function AppointmentForm({handleSubmit}) {
    // const [oldCustomer, setOldCustomer] = useState(false);
    const handleSubmitForm = async (values, actions) => {
        await handleSubmit(values, actions);
    };

    return (
        <FormikStepper
            initialValues={{
                patient: {
                    patient_name: '',
                    phone: '',
                    gender: '',
                    dob: null,
                    occupation: '',
                    identity_number: '',
                    note: '',
                    height: '',
                    weight: '',
                    address: {
                        province: '',
                        district: '',
                        ward: '',
                        details: '',
                    },
                },
                appointment: {
                    date: null,
                    time: '',
                    type: '',
                },
            }}
            onSubmit={handleSubmitForm}
        >
            <FormikStep
                label="Điền thông tin bệnh nhân"
                validationSchema={appointmentSchema.patient}
            >
                <General />
            </FormikStep>
            <FormikStep
                label="Chọn ngày và giờ"
                validationSchema={
                    appointmentSchema.appointment
                }
            >
                <DateTimeChoice />
            </FormikStep>
        </FormikStepper>
    );
}

export default AppointmentForm;
