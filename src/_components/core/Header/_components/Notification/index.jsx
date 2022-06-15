import React from 'react';
import {
    Badge,
    IconButton,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import {
    Notifications,
    FiberManualRecord,
} from '@mui/icons-material';
import './index.scss';
// import PropTypes from 'prop-types'

function Notification(props) {
    const [isOpen, setOpen] = React.useState(false);

    const handleStopPropagation = e => {
        e.stopPropagation();
    };
    React.useEffect(() => {
        const handleCloseNotify = e => {
            setOpen(false);
        };
        window.addEventListener('click', handleCloseNotify);
        return () => {
            window.removeEventListener(
                'click',
                handleCloseNotify,
            );
        };
    }, []);

    return (
        <div
            className="notification"
            onClick={handleStopPropagation}
        >
            <IconButton
                sx={{marginRight: 2}}
                onClick={setOpen.bind(null, true)}
            >
                <Badge variant="dot" color="warning">
                    <Notifications
                        fontSize="2"
                        className="notification__icon"
                    />
                </Badge>
            </IconButton>
            <Box
                className={
                    'notification__content ' +
                    (isOpen ? '' : 'hide')
                }
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{py: 1, px: 2}}
                    >
                        Thanh toán
                    </Typography>
                    <List sx={{p: 0}}>
                        <ListItem sx={{p: 0}}>
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{minWidth: '28px'}}
                                >
                                    <FiberManualRecord
                                        sx={{
                                            fontSize:
                                                '1rem',
                                            color: 'darkblue',
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="body1">
                                        Phiếu khám{' '}
                                        <span
                                            style={{
                                                color: 'red',
                                                fontWeight: 700,
                                            }}
                                        >
                                            0012
                                        </span>{' '}
                                        cần được thanh toán
                                    </Typography>
                                    <Typography
                                        variant="caption1"
                                        sx={{opacity: 0.8}}
                                    >
                                        1 giây trước
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{p: 0}}>
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{minWidth: '28px'}}
                                >
                                    <FiberManualRecord
                                        sx={{
                                            fontSize:
                                                '1rem',
                                            color: 'darkblue',
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="body1">
                                        Phiếu khám{' '}
                                        <span
                                            style={{
                                                color: 'red',
                                                fontWeight: 700,
                                            }}
                                        >
                                            0012
                                        </span>{' '}
                                        cần được thanh toán
                                    </Typography>
                                    <Typography
                                        variant="caption1"
                                        sx={{opacity: 0.8}}
                                    >
                                        1 giây trước
                                    </Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </div>
    );
}

Notification.propTypes = {};

export default Notification;
