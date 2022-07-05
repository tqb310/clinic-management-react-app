import React, {memo} from 'react';
import {Typography, Box, IconButton} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Dot} from '_components/shared/StyledComponent';
import {StatusPaper} from '_components/shared/StyledComponent';
import PaperImg from '_assets/images/paper.png';
import {ArrowDownward} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import RoleMap from '_constants/role';
import {SkeletonLoading} from '_components/shared/SkeletonLoading';
import './index.scss';
// import PropTypes from 'prop-types'
const statusArray = [
    {status: 'error', text: 'Qua lượt'},
    {status: 'primary', text: 'Đang chờ'},
    {status: 'success', text: 'Đang khám'},
];
function QueueListItem({
    orderNumber,
    name,
    gender,
    dob,
    status,
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                userSelect: 'none',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    width: '60px',
                    color: 'primary.main',
                }}
            >
                {orderNumber
                    ? `# ${orderNumber
                          ?.toString()
                          .padStart(2, '0')}`
                    : ''}
            </Typography>
            <Box sx={{flex: 1}}>
                <Typography variant="h6">
                    {name || ''}
                </Typography>
                <Typography color="#888" fontWeight={400}>
                    {gender || ''} <Dot />{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        {dob || ''}
                    </Typography>
                </Typography>
            </Box>
            <StatusPaper
                status={statusArray[status].status}
            >
                {statusArray[status].text}
            </StatusPaper>
        </Box>
    );
}

function QueueSummary({data, loading}) {
    // const dispatch = useDispatch();

    const role = useSelector(
        state => state.user.current?.role,
    );
    return (
        <CustomPaper className="queue-summary">
            <Typography
                variant="h5"
                className="queue-summary__title"
            >
                Hàng đợi
            </Typography>
            {loading ? (
                Array.from(new Array(5), (_, index) => (
                    <SkeletonLoading
                        key={index}
                        sx={{mt: 2}}
                    />
                ))
            ) : (
                <Box sx={{mt: 1}}>
                    {data.length ? (
                        data.map((item, index) => (
                            <QueueListItem
                                key={index}
                                orderNumber={
                                    item.numerical_order
                                }
                                name={
                                    item.last_name +
                                    ' ' +
                                    item.first_name
                                }
                                gender={
                                    item.gender
                                        ? 'Nam'
                                        : 'Nữ'
                                }
                                dob={item.dob}
                                status={item.status}
                            />
                        ))
                    ) : (
                        <img
                            src={PaperImg}
                            alt="empty logo"
                            width={200}
                            style={{
                                margin: '60px auto 0',
                                display: 'block',
                                opacity: 0.4,
                            }}
                        />
                    )}
                </Box>
            )}
            {Boolean(data.length) && (
                <Link
                    to={`${RoleMap.get(role).url}/hang-doi`}
                >
                    <Box className="queue-summary__more">
                        <IconButton
                            sx={{
                                opacity: 0.4,
                                transition: 'opacity 0.3s',
                                backgroundColor: '#f8f8f8',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <ArrowDownward />
                        </IconButton>
                    </Box>
                </Link>
            )}
        </CustomPaper>
    );
}

QueueSummary.propTypes = {};

export default memo(QueueSummary);
