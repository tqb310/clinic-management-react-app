import React, {useState, memo} from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';
import {
    RadioButtonUnchecked,
    CheckCircle,
    Add,
} from '@mui/icons-material';
import {CustomPaper} from '_components/shared/StyledComponent';
import PatientInfo from './_components/PatientInfo';
import ServiceInfo from './_components/ServiceInfo';
import PrescriptionForm from './_components/Prescription';
import ServiceDialog from 'pages/3-queue/_components/AddForm/_components/ServiceDialog';
import ExaminingForm from './_components/ExaminingForm';
import {Formik, Form, Field} from 'formik';
import invoiceSchema from '_validations/invoiceSchema';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Prompt} from 'react-router-dom';
import './index.scss';
// import PropTypes from 'prop-types'
const gender = ['Nữ', 'Nam'];
function ExamineCard({selectedCard, handleSubmit}) {
    const [openPrescription, setOpenPrescription] =
        useState(false);
    const [openService, setOpenService] = useState(false);

    const handleOpenService = () => {
        setOpenService(true);
    };
    const handleCloseService = () => {
        setOpenService(false);
    };
    const handleClosePrescription = () => {
        setOpenPrescription(false);
    };

    return (
        <CustomPaper className="DTExamineCard">
            <Formik
                enableReinitialize
                initialValues={{
                    heart_rate: '',
                    breathing_rate: '',
                    blood_pressure: '',
                    temperature: '',
                    symptom: '',
                    diagnosis: '',
                    follow_up_date: null,
                    follow_up_time: {
                        hour: '',
                        minute: '',
                    },
                    services: selectedCard?.services || [],
                    prescription: [],
                }}
                onSubmit={handleSubmit}
                validationSchema={invoiceSchema}
            >
                {form => {
                    return (
                        <Form>
                            <Prompt
                                when={
                                    form.dirty ||
                                    Boolean(selectedCard)
                                }
                                message="Bạn có thực sự muốn rời khỏi trang này?"
                            />
                            <div className="DTExamineCard__header">
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                >
                                    Phiếu khám bệnh
                                </Typography>
                                <p>
                                    {selectedCard && (
                                        <span>
                                            #
                                            {
                                                selectedCard.id
                                            }
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="DTExamineCard__cardInfo">
                                <p>
                                    <span>Ngày lập</span>
                                    <TextField
                                        variant="filled"
                                        value={
                                            selectedCard?.create_at ||
                                            ''
                                        }
                                        size="small"
                                        sx={{
                                            '& .MuiInputBase-input':
                                                {
                                                    paddingTop: 0,
                                                },
                                            width: 150,
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="DTExamineCard__content">
                                <div className="DTExamineCard__patientInfo">
                                    <PatientInfo
                                        first_name={
                                            selectedCard?.first_name
                                        }
                                        last_name={
                                            selectedCard?.last_name
                                        }
                                        dob={
                                            selectedCard?.dob
                                        }
                                        phone={
                                            selectedCard?.phone
                                        }
                                        identity_number={
                                            selectedCard?.identity_number
                                        }
                                        occupation={
                                            selectedCard?.occupation
                                        }
                                        ward={
                                            selectedCard?.ward
                                        }
                                        district={
                                            selectedCard?.district
                                        }
                                        province={
                                            selectedCard?.province
                                        }
                                        note={
                                            selectedCard?.note
                                        }
                                        gender={
                                            gender[
                                                selectedCard
                                                    ?.gender
                                            ]
                                        }
                                    />
                                </div>
                                <div className="DTExamineCard__service">
                                    <Field name="services">
                                        {({
                                            form,
                                            field,
                                        }) => {
                                            const setServiceValue =
                                                (
                                                    _,
                                                    value,
                                                ) => {
                                                    const e =
                                                        {
                                                            target: {
                                                                name: 'services',
                                                                value: value,
                                                            },
                                                        };
                                                    field.onChange(
                                                        e,
                                                    );
                                                };
                                            return (
                                                <>
                                                    <ServiceInfo
                                                        data={
                                                            field.value
                                                        }
                                                        setFieldValue={
                                                            setServiceValue
                                                        }
                                                        errorMsg={
                                                            form
                                                                .errors
                                                                .services
                                                        }
                                                    />
                                                    <Box
                                                        sx={{
                                                            display:
                                                                'flex',
                                                        }}
                                                    >
                                                        <Button
                                                            sx={{
                                                                ml: 'auto',
                                                            }}
                                                            startIcon={
                                                                <Add />
                                                            }
                                                            onClick={
                                                                handleOpenService
                                                            }
                                                        >
                                                            Thêm
                                                        </Button>
                                                    </Box>
                                                    <ServiceDialog
                                                        open={
                                                            openService
                                                        }
                                                        onClose={
                                                            handleCloseService
                                                        }
                                                        selectedServiceId={
                                                            field.value
                                                        }
                                                        setFieldValue={
                                                            setServiceValue
                                                        }
                                                    />
                                                </>
                                            );
                                        }}
                                    </Field>
                                </div>
                                <div className="DTExamineCard__examineInfo">
                                    <ExaminingForm />
                                </div>
                            </div>
                            <div className="DTExamineCard__footer">
                                <div>
                                    <Button
                                        variant="outlined"
                                        color={
                                            form.errors
                                                .prescription
                                                ? 'error'
                                                : form
                                                      .values
                                                      ?.prescription
                                                      .length >
                                                  0
                                                ? 'success'
                                                : 'warning'
                                        }
                                        startIcon={
                                            form.values
                                                ?.prescription
                                                .length >
                                            0 ? (
                                                <CheckCircle />
                                            ) : (
                                                <RadioButtonUnchecked />
                                            )
                                        }
                                        sx={{width: 110}}
                                        onClick={() =>
                                            setOpenPrescription(
                                                true,
                                            )
                                        }
                                        disabled={
                                            !Boolean(
                                                selectedCard,
                                            )
                                        }
                                    >
                                        Kê toa
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: 160,
                                            marginRight: 2,
                                        }}
                                        type="submit"
                                        disabled={
                                            !Boolean(
                                                selectedCard,
                                            ) && !form.dirty
                                        }
                                    >
                                        Hoàn tất
                                        {form.isSubmitting && (
                                            <FontAwesomeIcon
                                                icon="spinner"
                                                spin
                                                style={{
                                                    marginLeft:
                                                        '10px',
                                                }}
                                            />
                                        )}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{width: 160}}
                                        type="reset"
                                        disabled={
                                            !Boolean(
                                                selectedCard,
                                            ) && !form.dirty
                                        }
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                            <PrescriptionForm
                                open={openPrescription}
                                handleClose={
                                    handleClosePrescription
                                }
                            />
                        </Form>
                    );
                }}
            </Formik>
        </CustomPaper>
    );
}

// ExamineCard.propTypes = {};

export default memo(ExamineCard);
