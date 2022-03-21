import {Paper} from '@mui/material';
import {
    styled,
    experimental_sx as sx,
} from '@mui/material/styles';

export const CustomPaper = styled(Paper)`
    box-shadow: 0 4px 8px #ddd;
    border-radius: 10px;
    transition: all 0.3s;
`;

export const StatusPaper = styled('div')(
    ({theme, statusCode}) => {
        return {
            minWidth: 50,
            backgroundColor: statusCode
                ? theme.palette.success.light
                : theme.palette.error.light,
            color: statusCode
                ? theme.palette.success.main
                : theme.palette.error.main,
            borderRadius: 16,
            padding: '0.5rem 1rem',
            fontSize: '1.25rem',
            fontWeight: '500',
        };
    },
);
