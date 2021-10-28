import React from 'react';
import {Paper, IconButton} from '@mui/material';
import {Notifications} from '@mui/icons-material';
import './index.scss'
// import PropTypes from 'prop-types'

function Notification(props) {
    return (
        <Paper className="notification">
            <IconButton className="notification__btn">
                <Notifications className="notification__icon"/>
            </IconButton>
        </Paper>
    )
}

Notification.propTypes = {

}

export default Notification

