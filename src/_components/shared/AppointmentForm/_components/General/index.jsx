import React, {memo} from 'react';
import {FastField, Field} from 'formik';
import {FormControl, FormLabel} from '@mui/material';
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
        <div className="AppointmentForm__general">
            <div className="col-1-8">
                <FastField
                    id="patient_name"
                    name="patient.patient_name"
                    component={Input}
                    label="Tên bệnh nhân"
                    icon={Person}
                    left="-4.5%"
                    required
                />
            </div>
            <div className="col-9-13">
                <FastField
                    id="gender"
                    name="patient.gender"
                    component={Select}
                    label="Giới tính"
                    items={gender}
                    required
                />
            </div>
            <div
                className="col-1-8"
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
                    required
                />
            </div>
            <div className="col-9-13">
                <FastField
                    id="patient.dob"
                    name="patient.dob"
                    component={DatePickerField}
                    label="Ngày sinh"
                    required
                />
            </div>
            <div className="col-1-8">
                <FastField
                    id="identity_number"
                    name="patient.identity_number"
                    component={Input}
                    label="CMND/CCCD"
                    left="-4.5%"
                    icon={BrandingWatermark}
                    required
                />
            </div>
            <div className="col-9-13">
                <FastField
                    id="occupation"
                    name="patient.occupation"
                    component={Input}
                    label="Nghề nghiệp"
                    left="-6.5%"
                    icon={Work}
                    required
                />
            </div>
            <div className="col-1-4">
                <FastField
                    name="patient.height"
                    id="patient.height"
                    component={Input}
                    label="Chiều cao"
                    icon="cm"
                    required
                />
            </div>
            <div className="col-5-8">
                <FastField
                    name="patient.weight"
                    id="patient.weight"
                    component={Input}
                    label="Cân nặng"
                    icon="kg"
                    required
                />
            </div>
            <div className="col-9-13">
                <FastField
                    name="patient.type"
                    id="patient.type"
                    component={Select}
                    label="Loại"
                    items={cardType}
                    required
                />
            </div>
            <div className="col-1-13">
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
                            required
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
                            required
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
                            required
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
            </div>
            <div className="col-1-13">
                <FastField
                    name="patient.note"
                    id="NOTE"
                    component={TextArea}
                    label="Ghi chú"
                    icon={Edit}
                    multiline
                    rows={2}
                />
            </div>
        </div>
    );
}

General.propTypes = {};

export default memo(General);
