import React, {useState} from 'react';
import ExamineCard from './_components/ExamineCard';
import RightBarContent from './_components/RightBar';
import {data as fakeData} from '_constants/FakeData/Diagnostic';
// import {dateTimeNow} from '_constants/date';
// import socket from '_services/socket.io';
import './index.scss';
// import PropTypes from 'prop-types'

function Dashboard(props) {
    // const [room, setRoom] = useState(1);
    const [queue, setQueue] = useState([]);
    const [continuous, setContinuous] = useState(false);
    // socket.on('diagnostic-stack-change', (stack) => {
    //   if(room == 1){
    //     setQueue(stack.room1)
    //   }
    //   else{
    //     setQueue(stack.room2)
    //   }
    // })
    const start = pnum => {
        // socket.emit('start', { room, pnum })
    };
    // useEffect(() => {
    //   async function fetchData() {
    //     diagnostic.getRoom()
    //       .then((roomData) => {
    //         setRoom(roomData.room)
    //         setQueue(roomData.QUEUE)
    //       })
    //   }
    //   fetchData()
    // }, [])
    //Cập nhật phiếu khám bên module bác sĩ

    const handleSubmitFinal = async data => {
        // console.log(data);
        // console.log(queue[0].diagnostic.DIAGNOSTIC_ID);
        await null;
    };
    return (
        <div className="DoctorDashboard">
            <ExamineCard
                data={
                    queue.length > 0 && continuous
                        ? queue[0]
                        : JSON.parse(fakeData)
                }
                continuous={continuous}
                handleSubmitFinal={handleSubmitFinal}
            />
            <RightBarContent
                queue={queue}
                continuous={continuous}
                handleContinuous={setContinuous}
                start={start}
            />
        </div>
    );
}

Dashboard.propTypes = {};

export default Dashboard;
