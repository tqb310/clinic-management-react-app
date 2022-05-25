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
import getInitialDataFormat from '_helpers/getInitialDataFormat';
import './index.scss';

function AddForm({handleSubmit}) {
    const [initialValueState, setInitialValue] =
        useState(initialValue);
    const [switchEdit, setSwitchEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const isOpenHint = useSelector(
        state => state.queues.isOpenHint,
    );
    const filteredPatient = useSelector(
        state => state.queues.patientHint,
    );
    const selectedPatient = useSelector(
        state => state.queues.selected,
    );
    const dispatch = useDispatch();
    const {
        provinces,
        districts,
        wards,
        onChange: onChangeLocation,
    } = useLocation();

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const closeMenu = () => {
        dispatch(setPatientHint(''));
    };
    const handleSelect = item => e => {
        dispatch(setSelectedPatient(item));
    };
    const handleReset = e => {
        if (selectedPatient)
            dispatch(setSelectedPatient(null));
        setInitialValue(pre => ({...pre, initialValue}));
        setSwitchEdit(pre => false);
    };
    useEffect(() => {
        if (selectedPatient) {
            setInitialValue({
                ...initialValueState,
                ...getInitialDataFormat(selectedPatient),
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
                onSubmit={handleSubmit}
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
                                        name="PATIENT_NAME"
                                        id="PATIENT_NAME"
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
                                        name="PATIENT_PHONE"
                                        id="PATIENT_PHONE"
                                        component={Input}
                                        label="Số điện thoại"
                                        required
                                        icon={PhoneEnabled}
                                        autoComplete="off"
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
                                        name="IDENTITY_NUMBER"
                                        id="IDENTITY_NUMBER"
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
                                        name="OCCUPATION"
                                        id="OCCUPATION"
                                        component={Input}
                                        label="Nghề nghiệp"
                                        icon={Work}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="DATE_OF_BIRTH"
                                        id="DATE_OF_BIRTH"
                                        component={
                                            DatePickerField
                                        }
                                        label="Ngày sinh"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        name="PATIENT_GENDER"
                                        id="PATIENT_GENDER"
                                        component={Select}
                                        label="Giới tính"
                                        items={gender}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="HEIGHT"
                                        id="HEIGHT"
                                        component={Input}
                                        label="Chiều cao"
                                        icon="cm"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="WEIGHT"
                                        id="WEIGHT"
                                        component={Input}
                                        label="Cân nặng"
                                        icon="kg"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="PATIENT_TYPE"
                                        id="PATIENT_TYPE"
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
                                                name="ADDRESS.province"
                                                id="ADDRESS.province"
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
                                                name="ADDRESS.district"
                                                id="ADDRESS.district"
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
                                                name="ADDRESS.ward"
                                                id="ADDRESS.ward"
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
                                                name="ADDRESS.detail"
                                                id="ADDRESS.detail"
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
                                        name="NOTE"
                                        id="NOTE"
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
                                                ?.SERVICES
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
                                                ?.SERVICES
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
                                        onClick={
                                            form.submitForm
                                        }
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
