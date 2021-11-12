import React from "react";
// import PropTypes from 'prop-types';
import TabTableWrapper from "_components/TabTableWrapper";
import EnhancedTable from "./_components/QueryTable";
import {RightBar} from "_components/StyledComponent";

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
      <RightBar>
        vkjfvbf
      </RightBar>
    </div>
  );
}

Query.propTypes = {};

export default Query;
