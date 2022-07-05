import React from 'react';
import {Skeleton, Stack} from '@mui/material';

export function SkeletonLoading({...rest}) {
    return (
        <Stack direction="row" spacing={1} {...rest}>
            <Skeleton
                variant="circular"
                width={40}
                height={40}
            />
            <Stack direction="column" sx={{flexGrow: 1}}>
                <Skeleton variant="text" />
                <Skeleton
                    variant="text"
                    sx={{width: '50%'}}
                />
            </Stack>
        </Stack>
    );
}
