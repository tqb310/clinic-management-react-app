import React, {memo} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {Add, Search} from '@mui/icons-material';
import {Dot} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types';

function QueueListItem({className = ''}) {
    return (
        <Box className={`queue-list__item ${className}`}>
            <Typography
                variant="h6"
                sx={{
                    width: '60px',
                    color: 'primary.main',
                    textAlign: 'center',
                }}
            >
                # 26
            </Typography>
            <Box className="queue-list__item-info">
                <Typography variant="h6">
                    Truong Thi Lan
                </Typography>
                <Typography color="#888" fontWeight={400}>
                    Nữ <Dot />{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        23/12/1999
                    </Typography>
                </Typography>
                <Typography color="#888" fontWeight={400}>
                    Xếp hàng vào lúc:{' '}
                    <Typography
                        component="span"
                        fontWeight={400}
                    >
                        7:45 <Dot /> 30/03/2022
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}
function QueueList({}) {
    return (
        <Box className="queue-list">
            <Box className="queue-list__tab">
                <Box className="queue-list__tab-item active">
                    <Typography fontWeight="700">
                        Đang khám
                    </Typography>{' '}
                    (1)
                </Box>
                <Box className="queue-list__tab-item">
                    <Typography fontWeight="700">
                        Đang chờ
                    </Typography>{' '}
                    (10)
                </Box>
                <Box className="queue-list__tab-item">
                    <Typography fontWeight="700">
                        Qua lượt
                    </Typography>{' '}
                    (2)
                </Box>
            </Box>
            <Box className="queue-list__actions">
                <Button
                    startIcon={<Search />}
                    variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        width: '45%',
                        borderRadius: '20px',
                    }}
                >
                    Tìm kiếm
                </Button>
                <Button
                    startIcon={<Add />}
                    variant="contained"
                    sx={{
                        textTransform: 'capitalize',
                        width: '45%',
                        borderRadius: '20px',
                    }}
                >
                    Thêm mới
                </Button>
            </Box>
            <Box className="queue-list__content">
                <QueueListItem className="active" />
                <QueueListItem />
                <QueueListItem />
            </Box>
        </Box>
    );
}

QueueList.propTypes = {};

export default memo(QueueList);
