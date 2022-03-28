import {Paper} from '@mui/material';
import {styled} from '@mui/material/styles';

const statusColors = {
    success: {
        color: theme => theme.palette.success.main,
        bgColor: theme => theme.palette.success.light,
    },
    error: {
        color: theme => theme.palette.error.main,
        bgColor: theme => theme.palette.error.light,
    },
    disabled: {
        color: _ => '#555',
        bgColor: _ => '#eee',
    },
    primary: {
        color: theme => theme.palette.blue.main,
        bgColor: theme => theme.palette.blue.light,
    },
};

export const CustomPaper = styled(Paper)`
    box-shadow: 0 4px 8px #ddd;
    border-radius: 10px;
    transition: all 0.3s;
`;

export const StatusPaper = styled('div')(
    ({theme, status, ...rest}) => {
        return {
            minWidth: 70,
            backgroundColor:
                statusColors[status]?.bgColor(theme),
            color: statusColors[status]?.color(theme),
            borderRadius: 10,
            padding: '0.5rem 1rem',
            fontSize: '1.25rem',
            fontWeight: '500',
            display: 'inline-block',
            textAlign: 'center',
            ...rest,
        };
    },
);
