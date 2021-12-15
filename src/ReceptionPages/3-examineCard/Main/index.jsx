
import React, { useState, useEffect } from "react";
import TabTableWrapper from "_components/TabTableWrapper";
import Table from "_components/Table";
import diagnosticService from '_services/diagnostic.service'
import {useRouteMatch, useHistory} from 'react-router-dom';
import { ExamineHeadCells } from "_constants/headCell";
import { rows, stateData, createData } from "_constants/FakeData/QueryTable";

import "./index.scss";
// import PropTypes from 'prop-types'

const data = [
  { title: "Tất cả", number: 50 },
  { title: "Chưa hoàn tất", number: 2 },
  { title: "Chờ thu phí", number: 10 },
  { title: "Đang làm dịch vụ", number: 10 },
  { title: "Hoàn tất", number: 4 },
];

const newRows = (queue) => {
  const kq = queue.map((data, index) => {
    return createData(
      index + 1,
      data.PATIENT.PATIENT_NAME,
      data.PATIENT.PHONE,
      "8:30",
      1,
      data.STATUS
    )
  })
  return kq
}

function Main(props) {
  const [selectId, setSelectId] = useState(rows[0].id);
  const [diagnostics, setDiagnostics] = useState([])
  useEffect(() => {
    async function fetchData() {
      let data = await diagnosticService.getAllDiagnostic()
      setDiagnostics(data)
    }
    fetchData()
  }, [])
  console.log((diagnostics))

  const history = useHistory();
  const {path} = useRouteMatch();
  const onClickItem = (id) => {
    history.push(`${path}${id}`);
  }

  return (
    <TabTableWrapper tabNameArr={data} isAction>
      {(index) => {
        return (
          <div>
            <Table
              rows={newRows(diagnostics)}
              headCells={ExamineHeadCells}
              stateArray={stateData}
              rowsPerPage={10}
              isCheckbox={true}
              selectId={selectId}
              setSelectId={setSelectId}
              onClickItem={onClickItem}
            />
          </div>
        );
      }}
    </TabTableWrapper>
  );
}

Main.propTypes = {};

export default Main;
