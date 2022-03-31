import React from 'react';
// import {Box} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {QueueList, AddForm} from './_components';
import './index.scss';
// import PropTypes from 'prop-types';

function Queue(props) {
    return (
        <CustomPaper className="queue-container">
            <QueueList />
            <AddForm />
        </CustomPaper>
    );
}

Queue.propTypes = {};

export default Queue;
