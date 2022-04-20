import React from 'react';
import PatientTable from './_components/PatientTable';
import {RightBar} from '_components/shared/StyledComponent';
import RightBarContent from './_components/RightBar';
import {useSelector, useDispatch} from 'react-redux';
import {
    nextPage,
    backPage,
} from '_redux/slice/patientSlice';
import {Typography} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import Pagination from '_components/shared/Pagination';
import MaleIcon from '_assets/images/male.png';
import FemaleIcon from '_assets/images/female.png';
import PatientIcon from '_assets/images/dentistry.png';
import TodayPatientIcon from '_assets/images/today-patient.png';
import queryData from '_helpers/queryData';
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
    // const [queue, setQueue] = useState([]);
    // const [selectIndex, setSelectIndex] = useState(0);
    // const handleSelectIndex = index => {
    //     setSelectIndex(index);
    // };
    const patientState = useSelector(
        state => state.patients,
    );
    const dispatch = useDispatch();

    //Invoking when click on next page
    const handleNextPage = e => {
        dispatch(nextPage());
    };
    const maleNumber = queryData(
        patientState.data,
        data => data.gender === 1,
    ).length;
    const femaleNumber = queryData(
        patientState.data,
        data => data.gender === 0,
    ).length;
    //Invoking when click on next page
    const handleBackPage = e => {
        dispatch(backPage());
    };
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
                    number={54}
                />
                <PatientStat
                    img={MaleIcon}
                    title="Bệnh nhân nam"
                    number={maleNumber}
                />
                <PatientStat
                    img={FemaleIcon}
                    title="Bệnh nhân nữ"
                    number={femaleNumber}
                />
            </CustomPaper>
            <CustomPaper className="patient-table-container">
                <Typography variant="h5" sx={{mb: 2}}>
                    Danh sách bệnh nhân
                </Typography>
                <PatientTable
                    tableData={patientState.data}
                    rowsPerPage={patientState.rowsPerPage}
                    page={patientState.page}
                    selected={patientState.selected}
                    order={patientState.order}
                    orderBy={patientState.orderBy}
                />
                <Pagination
                    handleNextPage={handleNextPage}
                    handleBackPage={handleBackPage}
                    pageTotal={patientState.data.length}
                    currentPage={patientState.page}
                    rowsPerPage={patientState.rowsPerPage}
                />
            </CustomPaper>
            <RightBar>
                <RightBarContent
                // data={
                //     selectIndex <
                //     (queue && queue.length)
                //         ? queue[selectIndex]
                //         : replaceDateWhenQueueEmpty
                // }
                />
            </RightBar>
        </>
    );
}

Patient.propTypes = {};

export default Patient;
