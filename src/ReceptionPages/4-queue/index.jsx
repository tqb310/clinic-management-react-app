import React, {useEffect} from "react";
// import PropTypes from 'prop-types';
import TabTableWrapper from "_components/TabTableWrapper";
import EnhancedTable from "./_components/QueueTable";
import {RightBar} from "_components/StyledComponent";
import RightBarContent from "./_components/RightBar";
import socketIO from '_services/socket.io';
// import diagnosticService from '_services/diagnostic.service';
import { rows } from "_constants/FakeData/QueryTable";

const data = [
  { title: "Tất cả", number: 50 },
  { title: "Đang khám", number: 2 },
  { title: "Đang chờ", number: 10 },
  { title: "Qua lượt", number: 4 },
];

function Query(props) {
  socketIO.on('diagnostic-stack-change', (stack) => {
    console.log(stack);
  })

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let stack = await diagnosticService.getDiagnosticStack();
  //       console.log(stack)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

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
        <RightBarContent/>
      </RightBar>
    </div>
  );
}

Query.propTypes = {};

export default Query;
