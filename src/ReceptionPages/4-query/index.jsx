import React from "react";
// import PropTypes from 'prop-types';
import TabTableWrapper from "_components/TabTableWrapper";
import EnhancedTable from "./_components/QueryTable";

const data = [
  { title: "Tất cả", number: 50 },
  { title: "Đang khám", number: 2 },
  { title: "Đang chờ", number: 10 },
  { title: "Qua lượt", number: 4 },
];

function Query(props) {
  return (
    <div>
      <TabTableWrapper tabNameArr={data}>
        {() => (
          <div>
            <EnhancedTable />
          </div>
        )}
      </TabTableWrapper>
    </div>
  );
}

Query.propTypes = {};

export default Query;
