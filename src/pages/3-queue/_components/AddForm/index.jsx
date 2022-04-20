import React, {memo, useState} from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    IconButton,
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
import {Formik, Form, FastField} from 'formik';
import {
    Input,
    Date,
    Select,
    TextArea,
} from '_components/shared/FormikField';
import {gender} from '_constants/general';
import {initialValue, fakeData} from './_constants';
import {
    ServiceDialog,
    SelectedServiceTable,
} from './_components';
import './index.scss';
// import PropTypes from 'prop-types';

function AddForm() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Box className="add-form">
            <Typography variant="h5">
                Tạo phiếu khám
            </Typography>
            <Formik initialValues={initialValue}>
                {form => {
                    // console.log(rest);
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
                                <Grid item xs={4}>
                                    <FastField
                                        name="PATIENT_PHONE"
                                        id="PATIENT_PHONE"
                                        component={Input}
                                        label="Số điện thoại"
                                        required
                                        icon={PhoneEnabled}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        name="DATE_OF_BIRTH"
                                        id="DATE_OF_BIRTH"
                                        component={Date}
                                        label="Ngày sinh"
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
                                        name="IDENTITY_NUMBER"
                                        id="IDENTITY_NUMBER"
                                        component={Input}
                                        label="CMND/CCCD"
                                        icon={
                                            BrandingWatermark
                                        }
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
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle2"
                                        color="#888"
                                        gutterBottom
                                        ml={1}
                                    >
                                        Địa chỉ
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="ADDRESS.province"
                                        id="ADDRESS.province"
                                        component={Select}
                                        label="Tỉnh/ thành phố"
                                        items={gender}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="ADDRESS.district"
                                        id="ADDRESS.district"
                                        component={Select}
                                        label="Huyện/ quận"
                                        items={gender}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="ADDRESS.ward"
                                        id="ADDRESS.ward"
                                        component={Select}
                                        label="Xã/ phường"
                                        items={gender}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="ADDRESS.detail"
                                        id="ADDRESS.detail"
                                        component={TextArea}
                                        label="Số nhà, tên đường ..."
                                        rows={2}
                                        icon={Home}
                                    />
                                </Grid>
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
                                            fakeData
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
                                            fakeData
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        position: 'sticky',
                                        bottom: '2px',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        Đưa vào hàng đợi
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

AddForm.propTypes = {};

export default memo(AddForm);
