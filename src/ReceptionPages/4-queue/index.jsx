import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import TabTableWrapper from "_components/TabTableWrapper";
import EnhancedTable from "./_components/QueueTable";
import { RightBar } from "_components/StyledComponent";
import RightBarContent from "./_components/RightBar";
import socketIO from '_services/socket.io';
import diagnosticService, {mergeStack} from '_services/diagnostic.service';
import {
  rows,
  replaceDateWhenQueueEmpty
} from "_constants/FakeData/QueryTable";
import {createData} from '_constants/FakeData/ExamineList'

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

const newRows = (queue) => {
  const kq = queue.map(data => {
    return createData(
      data.data.order,
      data.data.diagnostic.PATIENT.PATIENT_NAME,
      data.data.diagnostic.PATIENT.PHONE,
      "8:30",
      data.room,
      status.get(data.data.status)
    )
  })
  return kq
}

function Query(props) {
  const [queue, setQueue] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)
  const handleSelectIndex = (index) => {
    setSelectIndex(index)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let stack = await diagnosticService.getDiagnosticStack();
        setQueue(stack)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  socketIO.on('diagnostic-stack-change', (stack) => {
    console.log(newRows(mergeStack(stack)))
    setQueue(mergeStack(stack))
  })
  console.log(newRows(queue))
  return (
    <div>
      <TabTableWrapper tabNameArr={data} isAction>
        {() => (
          <div>
            <EnhancedTable data={newRows(queue)} selectIndex={selectIndex} handleSelectIndex={handleSelectIndex} />
          </div>
        )}
      </TabTableWrapper>
      <RightBar>
        <RightBarContent data={(selectIndex < (queue && queue.length))? queue[selectIndex] : replaceDateWhenQueueEmpty} />
      </RightBar>
    </div>
  );
}

Query.propTypes = {};

export default Query;
