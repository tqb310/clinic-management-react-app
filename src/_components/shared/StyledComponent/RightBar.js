import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';

export const RightBar = styled(Box)(({theme}) => ({
    position: 'fixed',
    right: 0,
    top: 0,
    bottom: 0,
    width: '400px',
    textAlign: 'center',
    borderLeft: '2px solid #eee',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
        display: 'block',
    },
}));
