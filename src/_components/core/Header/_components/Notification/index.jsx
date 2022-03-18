import React from 'react';
import { Badge } from '@mui/material';
import {Notifications} from '@mui/icons-material';
import {CustomPaper} from '_components/shared/StyledComponent/Paper.js';
import './index.scss'
// import PropTypes from 'prop-types'

function Notification(props) {
    return (
        <CustomPaper className="notification" >
            <Badge variant="dot" color="warning">
                <Notifications className="notification__icon"/>
            </Badge>
        </CustomPaper>
    )
}

Notification.propTypes = {

}

export default Notification

