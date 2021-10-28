import React from 'react';
import {Paper, IconButton, Badge } from '@mui/material';
import {Notifications} from '@mui/icons-material';
import './index.scss'
// import PropTypes from 'prop-types'

function Notification(props) {
    return (
        <Paper className="notification" sx={{boxShadow: '0 4px 10px #CCC', borderRadius: 2, transition: 'all .3s'}}>
            <Badge variant="dot" color="warning">
                <Notifications className="notification__icon"/>
            </Badge>
        </Paper>
    )
}

Notification.propTypes = {

}

export default Notification

