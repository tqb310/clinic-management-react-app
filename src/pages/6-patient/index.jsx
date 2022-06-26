import React, {useLayoutEffect} from 'react';
import PatientTable from './_components/PatientTable';
import {RightBar} from '_components/shared/StyledComponent';
import RightBarContent from './_components/RightBar';
import {useSelector, useDispatch} from 'react-redux';
import {setDataAsync} from '_redux/slice/patientSlice';
import {Typography} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import MaleIcon from '_assets/images/male.png';
import FemaleIcon from '_assets/images/female.png';
import PatientIcon from '_assets/images/dentistry.png';
import TodayPatientIcon from '_assets/images/today-patient.png';
import './index.scss';
// import PropTypes from 'prop-types';

const PatientStat = ({title, number, img}) => (
    <div className="patient-stat">
        <img
            src={img}
            alt="lich-logo"
            width={40}
            height={40}
        />
        <div className="text-wrapper">
            <Typography variant="body1" color="#999">
                {title}
            </Typography>
            <Typography variant="h4" fontWeight={700}>
                {number}
            </Typography>
        </div>
    </div>
);
function Patient(props) {
    const patientState = useSelector(
        state => state.patients,
    );
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(setDataAsync());
    }, []);

    return (
        <>
            <CustomPaper className="patient-stat-container">
                <PatientStat
                    img={PatientIcon}
                    title="Tổng số bệnh nhân"
                    number={patientState.data.length}
                />
                <PatientStat
                    img={TodayPatientIcon}
                    title="Số bệnh nhân hôm nay"
                    number={patientState.todayPatient}
                />
                <PatientStat
                    img={MaleIcon}
                    title="Bệnh nhân nam"
                    number={patientState.malePatient}
                />
                <PatientStat
                    img={FemaleIcon}
                    title="Bệnh nhân nữ"
                    number={patientState.femalePatient}
                />
            </CustomPaper>
            <CustomPaper className="patient-table-container">
                <Typography
                    variant="h5"
                    sx={{mb: 2, mt: 1}}
                >
                    Danh sách bệnh nhân
                </Typography>
                <PatientTable
                    tableData={patientState.data}
                    selected={patientState.selected}
                    selectedPatient={
                        patientState.selectedPatient
                    }
                />
            </CustomPaper>
            <RightBar>
                <RightBarContent
                    data={patientState.selectedPatient}
                />
            </RightBar>
        </>
    );
}

Patient.propTypes = {};

export default Patient;
