import React, {useState, useReducer} from 'react';
import PatientTable from './_components/PatientTable';
import {RightBar} from '_components/shared/StyledComponent';
import RightBarContent from './_components/RightBar';
import {
    reducer,
    initState,
    nextPageAction,
    backPageAction,
} from './_localReducer/patientReducer';
import {Typography} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import Pagination from '_components/shared/Pagination';
import MaleIcon from '_assets/images/male.png';
import FemaleIcon from '_assets/images/female.png';
import PatientIcon from '_assets/images/dentistry.png';
import TodayPatientIcon from '_assets/images/today-patient.png';
import './index.scss';
// import PropTypes from 'prop-types';
// import socketIO from '_services/socket.io';
// import diagnosticService, {
//     mergeStack,
// } from '_services/diagnostic.service';

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
    const [queue, setQueue] = useState([]);
    const [selectIndex, setSelectIndex] = useState(0);
    const handleSelectIndex = index => {
        setSelectIndex(index);
    };
    const [state, localDispatch] = useReducer(
        reducer,
        initState,
    );
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       let stack = await diagnosticService.getDiagnosticStack();
    //       setQueue(stack)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   fetchData()
    // }, [])

    // socketIO.on('diagnostic-stack-change', (stack) => {
    //   console.log(newRows(mergeStack(stack)))
    //   setQueue(mergeStack(stack))
    // })
    // console.log(newRows(queue))
    // const handleResetData = e => {
    //     dispatchTable(resetTableAction([...preservedData]));
    // };
    //Invoking when delete all selected items
    // const handleDeleteItem = e => {
    //     dispatchTable(
    //         deleteAction(
    //             [...state.data].filter(
    //                 item =>
    //                     !state.selected.includes(item.id),
    //             ),
    //         ),
    //     );
    // };
    //Invoking when click on next page
    const handleNextPage = e => {
        localDispatch(nextPageAction());
    };
    //Invoking when click on next page
    const handleBackPage = e => {
        localDispatch(backPageAction());
    };
    return (
        <>
            <CustomPaper className="patient-stat-container">
                <PatientStat
                    img={PatientIcon}
                    title="Tổng số bệnh nhân"
                    number={4321}
                />
                <PatientStat
                    img={TodayPatientIcon}
                    title="Số bệnh nhân hôm nay"
                    number={54}
                />
                <PatientStat
                    img={MaleIcon}
                    title="Bệnh nhân nam"
                    number={2301}
                />
                <PatientStat
                    img={FemaleIcon}
                    title="Bệnh nhân nữ"
                    number={2020}
                />
            </CustomPaper>
            <CustomPaper className="patient-table-container">
                <Typography variant="h5" sx={{mb: 2}}>
                    Danh sách bệnh nhân
                </Typography>
                <PatientTable
                    tableData={state.data}
                    rowsPerPage={state.rowsPerPage}
                    page={state.page}
                    selected={state.selected}
                    dispatchTable={localDispatch}
                    order={state.order}
                    orderBy={state.orderBy}
                />
                <Pagination
                    handleNextPage={handleNextPage}
                    handleBackPage={handleBackPage}
                    pageTotal={state.data.length}
                    currentPage={state.page}
                    rowsPerPage={state.rowsPerPage}
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
