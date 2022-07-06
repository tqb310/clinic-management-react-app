import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#f1f1f1',
            borderRadius: 10,
        },
    },
});

export default CssTextField