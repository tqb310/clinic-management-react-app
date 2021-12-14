import React, {useState} from "react";
import {useRouteMatch, useHistory} from 'react-router-dom';
import TabTableWrapper from "_components/TabTableWrapper";
import Table from "_components/Table";
import { ExamineHeadCells } from "_constants/headCell";
import { rows, stateData } from "_constants/FakeData/ExamineList";
import "./index.scss";
// import PropTypes from 'prop-types'

const data = [
  { title: "Tất cả", number: 50 },
  { title: "Chưa hoàn tất", number: 2 },
  { title: "Chờ thu phí", number: 10 },
  { title: "Đang làm dịch vụ", number: 10 },
  { title: "Hoàn tất", number: 4 },
];

function Main(props) {
  const [selectId, setSelectId] = useState(rows[0].id);
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
              headCells={ExamineHeadCells}
              rows={rows}
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
