import React, {memo} from 'react';
import {Avatar, Typography} from '@mui/material';
import {StatusPaper} from '_components/shared/StyledComponent';
import './index.scss';

function ListItem({
    avatar,
    title,
    subtitle,
    statusText,
    statusCode,
}) {
    return (
        <div className="list-item">
            <Avatar
                src={avatar}
                sx={{width: 32, height: 32}}
                variant="rounded"
            ></Avatar>
            <div className="list-item__info">
                <Typography variant="subtitle2">
                    {title}
                </Typography>
                <Typography variant="caption" color="#888">
                    {subtitle}
                </Typography>
            </div>
            <StatusPaper statusCode={statusCode}>
                {statusText}
            </StatusPaper>
        </div>
    );
}

export default memo(ListItem);
