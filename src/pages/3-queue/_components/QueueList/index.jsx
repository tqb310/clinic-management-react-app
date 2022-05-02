import React, {memo, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {Add, Search} from '@mui/icons-material';
import {Dot} from '_components/shared/StyledComponent';
import './index.scss';
// import PropTypes from 'prop-types';

const tabsName = [
    {id: 1, title: 'Đang khám', number: 12},
    {id: 2, title: 'Đang chờ', number: 12},
    {id: 3, title: 'Qua lượt', number: 12},
];

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
function QueueList() {
    const [tab, setTab] = useState(1);
    return (
        <Box className="queue-list">
            <Box className="queue-list__tab">
                {tabsName.map(item => (
                    <Box
                        key={item.id}
                        className={`queue-list__tab-item ${
                            tab === item.id ? 'active' : ''
                        }`}
                        onClick={setTab.bind(null, item.id)}
                    >
                        <Typography fontWeight="700">
                            {item.title}
                        </Typography>{' '}
                        ({item.number})
                    </Box>
                ))}
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
                <QueueListItem />
            </Box>
        </Box>
    );
}

QueueList.propTypes = {};

export default memo(QueueList);
