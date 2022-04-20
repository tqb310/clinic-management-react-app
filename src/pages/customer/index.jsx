import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {
    Button,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
// import { Date } from "_components/shared/FormikField/DateTime";
// import { gender, district, province, ward } from "_constants/FakeData/Select";
// import { Close } from "@mui/icons-material";
import General from './General';
import DateTimeChoice from './DateTime';
import {
    district,
    province,
    ward,
} from '_constants/FakeData/Select';
import appointment from '_services/appointment.service';
import {dateParse} from '_constants/date';
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
            onSubmit={(value, helpers) => {
                if (
                    currentTab ===
                    childrenArray.length - 1
                ) {
                    onSubmit(value, helpers);
                } else {
                    setCurrentTab(currentTab + 1);
                }
            }}
        >
            {({values}) => {
                // console.log(values);
                return (
                    <Form
                        style={{
                            width: '600px',
                            margin: 'auto',
                            marginTop: '2rem',
                        }}
                    >
                        <h4>Đặt lịch hẹn</h4>
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
                                    onClick={() =>
                                        setCurrentTab(
                                            currentTab - 1,
                                        )
                                    }
                                    sx={{
                                        color: '#2E3192',
                                        marginRight: '1rem',
                                        '&:hover': {
                                            backgroundColor:
                                                '#e8e8fc',
                                        },
                                    }}
                                >
                                    Trở lại
                                </Button>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor:
                                        '#2E3192',
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
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

function RequestForm() {
    // const [oldCustomer, setOldCustomer] = useState(false);
    return (
        <FormikStepper
            initialValues={{
                patient: {
                    patient_name: '',
                    phone: '',
                    gender: '',
                    date_of_birth: null,
                    occupation: '',
                    identity_number: '',
                    note: '',
                    address: {
                        province: '',
                        district: '',
                        ward: '',
                        details: '',
                    },
                },
                appointment: {
                    doctor_id: '',
                    time: {
                        date: null,
                        time: '',
                    },
                },
            }}
            onSubmit={async (value, helpers) => {
                const p = province.find(
                    item =>
                        item.value ==
                        value.patient.address.province,
                ).key;
                const d = district.find(
                    item =>
                        item.value ==
                        value.patient.address.district,
                ).key;
                const w = ward.find(
                    item =>
                        item.value ==
                        value.patient.address.ward,
                ).key;
                const det = value.patient.address.details;
                const handledValue = {
                    ...value,
                    appointment: {
                        ...value.appointment,
                        time: `${dateParse(
                            value.appointment.time.date,
                        )} ${value.appointment.time.time}`,
                    },
                    patient: {
                        ...value.patient,
                        date_of_birth: dateParse(
                            value.patient.date_of_birth,
                        ),
                        ADDRESS: `${
                            det ? det + ', ' : ''
                        }${w}, ${d}, ${p}`,
                    },
                };
                console.log(handledValue);
                let result =
                    await appointment.createAppointmentRequest(
                        handledValue,
                    );
                if (!result)
                    alert('Lỗi server, vui lòng thử lại');
                else alert('Tạo thành công');
            }}
        >
            <FormikStep label="Điền thông tin bệnh nhân">
                <General />
            </FormikStep>
            <FormikStep label="Chọn ngày và bác sĩ khám">
                <DateTimeChoice />
            </FormikStep>
        </FormikStepper>
    );
}

export default RequestForm;
