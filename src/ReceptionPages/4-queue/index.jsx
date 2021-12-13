import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import TabTableWrapper from "_components/TabTableWrapper";
import EnhancedTable from "./_components/QueueTable";
import { RightBar } from "_components/StyledComponent";
import RightBarContent from "./_components/RightBar";
import socketIO from '_services/socket.io';
import diagnosticService from '_services/diagnostic.service';
import { rows, createData } from "_constants/FakeData/QueryTable";

const data = [
  { title: "Tất cả", number: 50 },
  { title: "Đang khám", number: 2 },
  { title: "Đang chờ", number: 10 },
  { title: "Qua lượt", number: 4 },
];

const status = new Map([
  ['pending', 1],
  ['diagnosing', 0],
  ['turn out', 2]
])

function Query(props) {
  const [queue, setQueue] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)
  const handleSelectIndex = (index)=>{
    setSelectIndex(index)
  }
  const newRows = (stack) => {
    const newQ = stack.map(row => {
      console.log(row.data)
      return createData(
        row.data.order,
        row.data.diagnostic.PATIENT.PATIENT_NAME,
        row.data.diagnostic.PATIENT.PHONE,
        "8:30",
        row.room,
        status.get(row.data.status)
      )
    })
    return newQ
  }
  socketIO.on('diagnostic-stack-change', (stack) => {
    setQueue(stack)
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        let stack = await diagnosticService.getDiagnosticStack();
        console.log('stack',stack)
        setQueue(stack)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <TabTableWrapper tabNameArr={data}>
        {() => (
          <div>
            <EnhancedTable data={rows}/>
          </div>
        )}
      </TabTableWrapper>
      <RightBar>
        <RightBarContent data={queue[selectIndex]} />
      </RightBar>
    </div>
  );
}

Query.propTypes = {};

export default Query;
