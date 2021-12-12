import React from "react";
import TabTableWrapper from "_components/TabTableWrapper";
import Table from "_components/Table";
import { headCells } from "_constants/headCell";
import { rows, stateData } from "_constants/FakeData/QueryTable";
import "./index.scss";
// import PropTypes from 'prop-types'

const data = [
  { title: "Tất cả", number: 50 },
  { title: "Chưa hoàn tất", number: 2 },
  { title: "Chờ xử lý", number: 10 },
  { title: "Hoàn tất", number: 4 },
];

function Main(props) {
  return (
    <TabTableWrapper tabNameArr={data}>
      {(index) => {
        return (
          <div>
            <Table
              headCells={headCells}
              rows={rows}
              stateArray={stateData}
              rowsPerPage={10}
              isCheckbox={true}
            />
          </div>
        );
      }}
    </TabTableWrapper>
  );
}

Main.propTypes = {};

export default Main;
