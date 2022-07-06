import React from 'react';
import {Skeleton, Stack} from '@mui/material';

export function ListSkeleton({...rest}) {
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

export function CardSkeleton({...rest}) {
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
                    sx={{width: '40%'}}
                />
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{mt: 2}}
                >
                    <Skeleton
                        variant="rectangle"
                        sx={{width: '30%'}}
                    />
                    <Skeleton
                        variant="rectangle"
                        sx={{width: '30%'}}
                    />
                </Stack>
            </Stack>
            <Skeleton
                variant="text"
                width={40}
                sx={{alignSelf: 'flex-start'}}
            />
        </Stack>
    );
}
