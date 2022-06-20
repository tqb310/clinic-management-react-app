import React, {memo, useMemo, useEffect} from 'react';
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
import {
    getCreatedTime,
    formatDate,
} from '_helpers/handleDate';
import {setDataAsync} from '_redux/slice/notificationSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestoreRealtime} from '_hooks';
import {useHistory} from 'react-router-dom';
import {
    setSelectedPaidInvoiceAsync,
    switchDrawer,
} from '_redux/slice/invoiceSlice';
import notificationService from '_services/firebase/notification.service';
import role from '_constants/role';
import './index.scss';
// import PropTypes from 'prop-types'

function Notification(props) {
    const [isOpen, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleStopPropagation = e => {
        e.stopPropagation();
    };
    const notiData = useSelector(
        state => state.notification.data,
    );
    const userRole = useSelector(
        state => state.user.current.role,
    );
    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'notification',
        eventHandler: () => {
            dispatch(setDataAsync());
        },
    });

    const notReadNotiData = useMemo(() => {
        return notiData.filter(item => !item.is_read);
    }, [notiData]);

    useEffect(() => {
        const handleCloseNotify = e => {
            setOpen(false);
        };
        const db = firestoreRealtime();

        window.addEventListener('click', handleCloseNotify);
        return () => {
            db();
            window.removeEventListener(
                'click',
                handleCloseNotify,
            );
        };
    }, []);
    const handleClickItem =
        (invoiceId, notiId) => async e => {
            setOpen(false);
            dispatch(
                setSelectedPaidInvoiceAsync(invoiceId),
            );
            dispatch(switchDrawer(true));
            if (userRole)
                history.push(
                    `${role.get(userRole).url}/phieu-kham`,
                );
            await notificationService.update(notiId, {
                is_read: true,
            });
        };
    return (
        <div
            className="notification"
            onClick={handleStopPropagation}
        >
            <IconButton
                sx={{marginRight: 2}}
                onClick={setOpen.bind(null, true)}
            >
                <Badge
                    badgeContent={notReadNotiData.length}
                    invisible={notReadNotiData.length === 0}
                    color="warning"
                >
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
                <Box
                    sx={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{py: 1, px: 2}}
                    >
                        Thanh toán
                    </Typography>
                    <List sx={{p: 0}}>
                        {notiData && notiData.length ? (
                            notiData.map(item => (
                                <ListItem
                                    sx={{p: 0}}
                                    key={item.id}
                                    onClick={handleClickItem(
                                        item.invoice_id,
                                        item.id,
                                    )}
                                >
                                    <ListItemButton>
                                        <ListItemIcon
                                            sx={{
                                                minWidth:
                                                    '28px',
                                            }}
                                        >
                                            {!item.is_read && (
                                                <FiberManualRecord
                                                    sx={{
                                                        fontSize:
                                                            '1rem',
                                                        color: 'darkblue',
                                                    }}
                                                />
                                            )}
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
                                                    {
                                                        item.invoice_id
                                                    }
                                                </span>{' '}
                                                cần được
                                                thanh toán
                                            </Typography>
                                            <Typography
                                                variant="caption1"
                                                sx={{
                                                    opacity: 0.8,
                                                }}
                                            >
                                                {getCreatedTime(
                                                    new Date(
                                                        formatDate(
                                                            item.create_at_date,
                                                            item.create_at_time,
                                                        ),
                                                    ),
                                                    new Date(),
                                                ).toString()}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'center',
                                    py: 2,
                                }}
                            >
                                Không có thông báo mới
                            </Typography>
                        )}
                    </List>
                </Box>
            </Box>
        </div>
    );
}

// Notification.propTypes = {};
export default memo(Notification);
