import React, {memo, useState, useEffect} from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    IconButton,
    TextField,
    FormControlLabel,
    Switch,
} from '@mui/material';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
    Add,
} from '@mui/icons-material';
import {Formik, Form, FastField, Field} from 'formik';
import {
    Input,
    DatePickerField,
    Select,
    TextArea,
} from '_components/shared/FormikField';
import {gender, cardType} from '_constants/general';
import {initialValue, services} from './_constants';
import {
    ServiceDialog,
    SelectedServiceTable,
} from './_components';
import {useLocation} from '_contexts/LocationContext';
import {useSelector, useDispatch} from 'react-redux';
import {
    setPatientHint,
    setSelectedPatient,
} from '_redux/slice/queueSlice';
import Popup from '_components/shared/Popup';
import ListItem from '_components/shared/ListItem';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {getInitialPatientDataFormat} from '_helpers/getInitialDataFormat';
import './index.scss';

function AddForm({handleSubmit}) {
    //Initial value for form
    const [initialValueState, setInitialValue] =
        useState(initialValue);
    // Switch to address editor mode
    const [switchEdit, setSwitchEdit] = useState(false);
    //Service modal
    const [open, setOpen] = useState(false);

    //Open hint list
    const isOpenHint = useSelector(
        state => state.queues.isOpenHint,
    );

    //Get all patients in hint list
    const filteredPatient = useSelector(
        state => state.queues.patientHint,
    );

    //Select a patient from hint list (state)
    const selectedPatient = useSelector(
        state => state.queues.selected,
    );

    const dispatch = useDispatch();

    //Location data
    const {
        provinces,
        districts,
        wards,
        onChange: onChangeLocation,
    } = useLocation();

    // Close service modal
    const handleClose = () => {
        setOpen(false);
    };
    // Open service modal
    const handleOpen = () => {
        setOpen(true);
    };

    // Close hint list
    const closeMenu = () => {
        dispatch(setPatientHint(''));
    };

    //Select a patient from hint list (dispatch)
    const handleSelect = item => e => {
        dispatch(setSelectedPatient(item));
    };

    //Reset form
    const handleReset = e => {
        if (selectedPatient)
            dispatch(setSelectedPatient(null));
        setInitialValue(pre => ({...pre, initialValue}));
        setSwitchEdit(false);
    };
    //Submit Form
    const handleSubmitFormik = async (values, actions) => {
        const isExistedPatient =
            selectedPatient && selectedPatient.id;
        try {
            await handleSubmit(
                values,
                actions,
                isExistedPatient,
            );
            handleReset();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedPatient) {
            setInitialValue({
                ...initialValueState,
                ...getInitialPatientDataFormat(
                    selectedPatient,
                ),
            });
        } else setInitialValue(initialValue);
    }, [selectedPatient]);

    return (
        <Box className="add-form">
            <Typography variant="h5">
                Tạo phiếu khám
            </Typography>
            <Formik
                enableReinitialize
                initialValues={initialValueState}
                onSubmit={handleSubmitFormik}
                onChange={() => {
                    console.log(
                        'All Form State is changed',
                    );
                }}
            >
                {form => {
                    // console.log(form);
                    return (
                        <Form>
                            <Grid
                                container
                                mt={2}
                                columnSpacing={2}
                                className="add-form__form-content"
                            >
                                <Grid item xs={5}>
                                    <FastField
                                        name="patient.patient_name"
                                        id="patient.patient_name"
                                        component={Input}
                                        label="Tên bệnh nhân"
                                        required
                                        icon={Person}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        position:
                                            'relative',
                                    }}
                                >
                                    <FastField
                                        name="patient.phone"
                                        id="patient.phone"
                                        component={Input}
                                        label="Số điện thoại"
                                        required
                                        icon={PhoneEnabled}
                                        autoComplete="off"
                                        setPatientHint={
                                            setPatientHint
                                        }
                                    />
                                    <Popup
                                        isOpen={isOpenHint}
                                        onClose={closeMenu}
                                    >
                                        {filteredPatient.map(
                                            (
                                                item,
                                                index,
                                            ) => (
                                                <ListItem
                                                    key={
                                                        index
                                                    }
                                                    avatar={
                                                        item.gender
                                                            ? MalePatient
                                                            : FemalePatient
                                                    }
                                                    title={
                                                        item.last_name +
                                                        ' ' +
                                                        item.first_name
                                                    }
                                                    subtitle={
                                                        item.phone
                                                    }
                                                    onClick={handleSelect(
                                                        item,
                                                    )}
                                                />
                                            ),
                                        )}
                                    </Popup>
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        name="patient.identity_number"
                                        id="patient.identity_number"
                                        component={Input}
                                        label="CCCD"
                                        icon={
                                            BrandingWatermark
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <FastField
                                        name="patient.occupation"
                                        id="patient.occupation"
                                        component={Input}
                                        label="Nghề nghiệp"
                                        icon={Work}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="patient.dob"
                                        id="patient.dob"
                                        component={
                                            DatePickerField
                                        }
                                        label="Ngày sinh"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        name="patient.gender"
                                        id="patient.gender"
                                        component={Select}
                                        label="Giới tính"
                                        items={gender}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="patient.height"
                                        id="patient.height"
                                        component={Input}
                                        label="Chiều cao"
                                        icon="cm"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="patient.weight"
                                        id="patient.weight"
                                        component={Input}
                                        label="Cân nặng"
                                        icon="kg"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="invoice.type"
                                        id="invoice.type"
                                        component={Select}
                                        label="Loại"
                                        items={cardType}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent:
                                                'space-between',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            color="#888"
                                            gutterBottom
                                            ml={1}
                                        >
                                            Địa chỉ
                                        </Typography>
                                        {selectedPatient && (
                                            <FormControlLabel
                                                sx={{
                                                    mr: 0,
                                                    mb: 1,
                                                }}
                                                label="Chỉnh sửa"
                                                control={
                                                    <Switch
                                                        size="small"
                                                        checked={
                                                            switchEdit
                                                        }
                                                        onChange={e =>
                                                            setSwitchEdit(
                                                                e
                                                                    .target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                }
                                            />
                                        )}
                                    </Box>
                                </Grid>
                                {!selectedPatient ||
                                switchEdit ? (
                                    <>
                                        <Grid item xs={4}>
                                            <Field
                                                name="patient.address.province"
                                                id="patient.address.province"
                                                component={
                                                    Select
                                                }
                                                label="Tỉnh/ thành phố"
                                                items={
                                                    provinces
                                                }
                                                onChangeLocation={
                                                    onChangeLocation
                                                }
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                name="patient.address.district"
                                                id="patient.address.district"
                                                component={
                                                    Select
                                                }
                                                label="Huyện/ quận"
                                                items={
                                                    districts
                                                }
                                                onChangeLocation={
                                                    onChangeLocation
                                                }
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                name="patient.address.ward"
                                                id="patient.address.ward"
                                                component={
                                                    Select
                                                }
                                                label="Xã/ phường"
                                                items={
                                                    wards
                                                }
                                                onChangeLocation={
                                                    onChangeLocation
                                                }
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField
                                                name="patient.address.details"
                                                id="patient.address.details"
                                                component={
                                                    TextArea
                                                }
                                                label="Số nhà, tên đường ..."
                                                rows={2}
                                                icon={Home}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12}>
                                        {' '}
                                        <TextField
                                            sx={{mb: 2}}
                                            fullWidth
                                            size="small"
                                            value={
                                                (selectedPatient.ward
                                                    ? selectedPatient.ward +
                                                      ' - '
                                                    : '') +
                                                selectedPatient.district +
                                                ' - ' +
                                                selectedPatient.province
                                            }
                                            multiline
                                            rows={3}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <FastField
                                        name="note"
                                        id="note"
                                        component={TextArea}
                                        label="Ghi chú"
                                        rows={3}
                                        maxRow={3}
                                        icon={Edit}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography
                                        variant="subtitle2"
                                        color="#888"
                                        gutterBottom
                                        ml={1}
                                    >
                                        Dịch vụ
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        onClick={handleOpen}
                                    >
                                        <Add color="primary" />
                                    </IconButton>
                                    <ServiceDialog
                                        open={open}
                                        selectedServiceId={
                                            form.values
                                                ?.invoice
                                                ?.services
                                        }
                                        serviceData={
                                            services
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                        onClose={
                                            handleClose
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectedServiceTable
                                        selectedServiceId={
                                            form.values
                                                ?.invoice
                                                ?.services
                                        }
                                        serviceData={
                                            services
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        position: 'sticky',
                                        bottom: '2px',
                                    }}
                                >
                                    <Button
                                        // onClick={
                                        //     form.submitForm
                                        // }
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        Đưa vào hàng đợi
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        position: 'sticky',
                                        bottom: '2px',
                                    }}
                                >
                                    <Button
                                        onClick={
                                            handleReset
                                        }
                                        type="reset"
                                        variant="outlined"
                                        color="error"
                                        sx={{
                                            width: '100%',
                                            backgroundColor:
                                                'white',
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
}

export default memo(AddForm);
