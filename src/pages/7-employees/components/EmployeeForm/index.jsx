import React from 'react';
import {Formik, FastField, Form} from 'formik';
import {
    Input,
    DatePickerField,
    Select,
    TextArea,
} from '_components/shared/FormikField';
import {
    gender as genderItems,
    role as roleItems,
} from '_constants/general';
import {Grid, Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';
function EmployeeForm({selectedEmployee, onSubmit}) {
    const {
        name,
        dob,
        email,
        address,
        phone,
        salary,
        gender,
        role,
    } = selectedEmployee;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                name,
                dob,
                email,
                address,
                phone,
                salary,
                gender,
                role,
            }}
            onSubmit={async (values, actions) => {
                try {
                    actions.setSubmitting(true);
                    await onSubmit(values, actions);
                } catch (error) {
                    throw error;
                } finally {
                    actions.setSubmitting(false);
                }
            }}
        >
            {form => {
                return (
                    <Form>
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={2}
                        >
                            <Grid item xs={12}>
                                <FastField
                                    id="name"
                                    name="name"
                                    component={Input}
                                    label="Tên nhân viên"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    id="phone"
                                    name="phone"
                                    component={Input}
                                    label="Điện thoại"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    id="email"
                                    name="email"
                                    component={Input}
                                    label="Email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    id="dob"
                                    name="dob"
                                    component={
                                        DatePickerField
                                    }
                                    label="Ngày sinh"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FastField
                                    id="gender"
                                    name="gender"
                                    component={Select}
                                    label="Giới tính"
                                    items={genderItems}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FastField
                                    id="role"
                                    name="role"
                                    component={Select}
                                    label="Vị trí"
                                    items={roleItems}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    id="salary"
                                    name="salary"
                                    component={Input}
                                    label="Lương"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FastField
                                    id="address"
                                    name="address"
                                    component={TextArea}
                                    label="Địa chỉ"
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    type="submit"
                                    loading={
                                        form.isSubmitting
                                    }
                                    disabled={!form.dirty}
                                    variant="outlined"
                                    color="primary"
                                    sx={{width: '100%'}}
                                >
                                    Sửa
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    disabled={
                                        !form.dirty ||
                                        form.isSubmitting
                                    }
                                    color="error"
                                    variant="contained"
                                    sx={{width: '100%'}}
                                >
                                    Hủy
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default EmployeeForm;
