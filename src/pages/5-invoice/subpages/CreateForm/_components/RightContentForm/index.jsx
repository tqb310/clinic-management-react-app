import React from 'react';
import {FastField, Field} from 'formik';
import {
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import Select from '_components/shared/FormikField/Select';
import {Date} from '_components/shared/FormikField/DateTime';
import {receptionist} from '_constants/FakeData/Select';
// import { services } from "_constants/FakeData/Checkbox";
import handlePriceFormat from '_helpers/handlePriceFormat';

import './index.scss';
// import PropTypes from 'prop-types'

function RightContent({serviceData}) {
    return (
        <div className="RightContent">
            <CustomPaper className="RightContent__card">
                <h4>Thông tin phiếu khám</h4>
                <div className="col-1-7">
                    <FastField
                        name="RECEPTIONIST"
                        id="RECEPTIONIST"
                        component={Select}
                        label="Nhân viên tiếp nhận"
                        items={receptionist}
                        required
                    />
                </div>
                <div className="col-8-13">
                    <FastField
                        name="CREATE_AT"
                        id="CREATE_AT"
                        component={Date}
                        label="Ngày lập"
                        required
                    />
                </div>
                <div className="col-1-13">
                    <FastField
                        id="DOCTOR_ID"
                        name="DOCTOR_ID"
                        component={({form, field}) => {
                            // console.log(field);
                            return (
                                <RadioGroup
                                    {...field}
                                    defaultValue={1}
                                >
                                    <table width="100%">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Phòng
                                                </th>
                                                <th>
                                                    Bác sĩ
                                                </th>
                                                <th>
                                                    Đang chờ
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <FormControlLabel
                                                        sx={{
                                                            '& .MuiTypography-root':
                                                                {
                                                                    fontSize: 14,
                                                                },
                                                        }}
                                                        value={
                                                            1
                                                        }
                                                        control={
                                                            <Radio />
                                                        }
                                                        label="Phòng 1"
                                                    />
                                                </td>
                                                <td>
                                                    BS.Phúc
                                                </td>
                                                <td>5</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FormControlLabel
                                                        sx={{
                                                            '& .MuiTypography-root':
                                                                {
                                                                    fontSize: 14,
                                                                },
                                                        }}
                                                        value={
                                                            2
                                                        }
                                                        control={
                                                            <Radio />
                                                        }
                                                        label="Phòng 2"
                                                    />
                                                </td>
                                                <td>
                                                    BS.Ly
                                                </td>
                                                <td>7</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </RadioGroup>
                            );
                        }}
                    />
                </div>
            </CustomPaper>
            <CustomPaper className="RightContent__card">
                <h4>Thông tin dịch vụ</h4>
                <div className="col-1-13">
                    <Field name="SERVICES">
                        {({form, field}) => {
                            // console.log(field);
                            const handleChange = e => {
                                // console.log(e.target.value);
                                let tempFee =
                                    form.values
                                        .DIAGNOSTIC_FEE;
                                const subtract =
                                    serviceData.find(
                                        item =>
                                            item.SERVICE_ID ===
                                            e.target.value,
                                    )?.FEE;
                                if (e.target.checked) {
                                    tempFee += subtract;
                                } else {
                                    tempFee -= subtract;
                                }
                                form.setFieldValue(
                                    'DIAGNOSTIC_FEE',
                                    tempFee,
                                );
                                field.onChange(e);
                            };
                            return (
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <th>Dịch vụ</th>
                                            <th>Phí</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceData.map(
                                            (
                                                service,
                                                index,
                                            ) => (
                                                <tr
                                                    key={
                                                        index
                                                    }
                                                >
                                                    <td>
                                                        <FormControlLabel
                                                            {...field}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                service.SERVICE_ID
                                                            }
                                                            sx={{
                                                                '& .MuiTypography-root':
                                                                    {
                                                                        fontSize: 14,
                                                                    },
                                                            }}
                                                            checked={field.value.includes(
                                                                service.SERVICE_ID +
                                                                    '',
                                                            )}
                                                            control={
                                                                <Checkbox id="normal" />
                                                            }
                                                            label={
                                                                service.SERVICE_NAME
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        {handlePriceFormat(
                                                            service.FEE,
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            );
                        }}
                    </Field>
                </div>
            </CustomPaper>
        </div>
    );
}

RightContent.propTypes = {};

export default RightContent;
