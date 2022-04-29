import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import {CustomPaper} from '_components/shared/StyledComponent';
import LeftContent from '../LeftContentForm';
import RightContent from '../RightContentForm';
// import Payment from '../Payment';
import {
    district,
    province,
    ward,
    gender,
} from '_constants/FakeData/Select';
// import Services from "_services/servicesUsing.service";
import './index.scss';
// import PropTypes from 'prop-types';

function ContentForm({onSubmit}) {
    // console.log(authentication.getCurrentUser()?.payload);
    const [serviceData, setServiceData] = useState([]);
    // const [fee, setFee] = useState(0);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const res = await Services.getAllServicesUser();
    //     // console.log(res);
    //     setServiceData(res);
    //     // console.log(res[0].FEE + 2);
    //   }
    //   fetchData();
    // }, [])
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    PATIENT_NAME: '',
                    PHONE: '',
                    DATE_OF_BIRTH: null,
                    CREATE_AT: new Date(),
                    GENDER: '',
                    OCCUPATION: '',
                    IDENTITY_NUMBER: '',
                    ADDRESS: {
                        details: '',
                        ward: '',
                        district: '',
                        province: '',
                    },
                    NOTE: '',
                    RECEPTIONIST: '',
                    DOCTOR_ID: '1',
                    SERVICES: ['1'],
                    DIAGNOSTIC_FEE:
                        serviceData[0]?.FEE || 0,
                }}
                onSubmit={value => {
                    const p = province.find(
                        item =>
                            item.value ==
                            value.ADDRESS.province,
                    ).key;
                    const d = district.find(
                        item =>
                            item.value ==
                            value.ADDRESS.district,
                    ).key;
                    const w = ward.find(
                        item =>
                            item.value ==
                            value.ADDRESS.ward,
                    ).key;
                    const det = value.ADDRESS.details;
                    const handledValue = {
                        ...value,
                        ADDRESS: `${
                            det ? det + ', ' : ''
                        }${w}, ${d}, ${p}`,
                    };
                    onSubmit(handledValue);
                }}
            >
                {({values, errors}) => {
                    // console.log(values);
                    const ddistrict = district.filter(
                        item =>
                            item.province ===
                            values.ADDRESS.province,
                    );
                    const dward = ward.filter(
                        item =>
                            item.district ===
                            values.ADDRESS.district,
                    );
                    return (
                        <Form className="ContentForm">
                            <div style={{display: 'flex'}}>
                                <CustomPaper className="ContentForm__left">
                                    <LeftContent
                                        province={province}
                                        district={ddistrict}
                                        ward={dward}
                                        gender={gender}
                                    />
                                </CustomPaper>
                                <div className="ContentForm__right">
                                    <RightContent
                                        serviceData={
                                            serviceData
                                        }
                                    />
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

ContentForm.propTypes = {};

export default ContentForm;
