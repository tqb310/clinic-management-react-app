import React, {memo} from 'react';
import {FastField, Field} from 'formik';
import {FormControl, FormLabel, Grid} from '@mui/material';
import Input from '_components/shared/FormikField/Input';
import Select from '_components/shared/FormikField/Select';
import TextArea from '_components/shared/FormikField/TextArea';
import {DatePickerField} from '_components/shared/FormikField';
import {gender, cardType} from '_constants/general';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
} from '@mui/icons-material';
import {useLocation} from '_contexts/LocationContext';
import './index.scss';
// import PropTypes from 'prop-types'

function General() {
    const {
        onChange: onChangeLocation,
        provinces,
        districts,
        wards,
    } = useLocation();
    return (
        <Grid
            container
            columnSpacing={2}
            className="AppointmentForm__general"
        >
            <Grid item xs={7}>
                <FastField
                    id="patient_name"
                    name="patient.patient_name"
                    component={Input}
                    label="Tên bệnh nhân"
                    icon={Person}
                    left="-4.5%"
                />
            </Grid>
            <Grid item xs={5}>
                <FastField
                    id="gender"
                    name="patient.gender"
                    component={Select}
                    label="Giới tính"
                    items={gender}
                />
            </Grid>
            <Grid
                item
                xs={7}
                style={{
                    position: 'relative',
                }}
            >
                <FastField
                    id="phone"
                    name="patient.phone"
                    component={Input}
                    label="Điện thoại"
                    left="-4.5%"
                    icon={PhoneEnabled}
                />
            </Grid>
            <Grid item xs={5}>
                <FastField
                    id="patient.dob"
                    name="patient.dob"
                    component={DatePickerField}
                    label="Ngày sinh"
                />
            </Grid>
            <Grid item xs={7}>
                <FastField
                    id="identity_number"
                    name="patient.identity_number"
                    component={Input}
                    label="CMND/CCCD"
                    left="-4.5%"
                    icon={BrandingWatermark}
                />
            </Grid>
            <Grid item xs={5}>
                <FastField
                    id="occupation"
                    name="patient.occupation"
                    component={Input}
                    label="Nghề nghiệp"
                    left="-6.5%"
                    icon={Work}
                />
            </Grid>
            <Grid item xs={4}>
                <FastField
                    name="patient.height"
                    id="patient.height"
                    component={Input}
                    label="Chiều cao"
                    icon="cm"
                />
            </Grid>
            <Grid item xs={4}>
                <FastField
                    name="patient.weight"
                    id="patient.weight"
                    component={Input}
                    label="Cân nặng"
                    icon="kg"
                />
            </Grid>
            <Grid item xs={4}>
                <FastField
                    name="appointment.type"
                    id="appointment.type"
                    component={Select}
                    label="Loại"
                    items={cardType}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl
                    fullWidth
                    sx={{marginBottom: '.5rem'}}
                >
                    <FormLabel
                        sx={{
                            fontWeight: 600,
                            fontSize: 14,
                        }}
                    >
                        Địa chỉ
                    </FormLabel>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                '1fr 1fr 1fr',
                            gridColumnGap: '1rem',
                            marginTop: '.8rem',
                        }}
                    >
                        <Field
                            name="patient.address.province"
                            id="ADDRESS.province"
                            component={Select}
                            label="Tỉnh/Thành phố"
                            items={provinces}
                            onChangeLocation={
                                onChangeLocation
                            }
                        />
                        <Field
                            name="patient.address.district"
                            id="ADDRESS.district"
                            component={Select}
                            label="Huyện/Quận"
                            items={districts}
                            onChangeLocation={
                                onChangeLocation
                            }
                        />
                        <Field
                            name="patient.address.ward"
                            id="ADDRESS.ward"
                            component={Select}
                            label="Xã/Phường"
                            items={wards}
                            onChangeLocation={
                                onChangeLocation
                            }
                        />
                    </div>
                    <FastField
                        name="patient.address.details"
                        id="ADDRESS.details"
                        component={TextArea}
                        label="Số nhà, tên đường..."
                        icon={Home}
                        multiline
                        rows={2}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="patient.note"
                    id="NOTE"
                    component={TextArea}
                    label="Ghi chú"
                    icon={Edit}
                    multiline
                    rows={2}
                />
            </Grid>
        </Grid>
    );
}

General.propTypes = {};

export default memo(General);
