import {
    RemoveRedEyeOutlined,
    EditOutlined,
    RestartAltOutlined,
    DoDisturbAltOutlined,
} from '@mui/icons-material';
import {openAppointmentDetail} from '_redux/slice/appointmentSlice';

const menu = [
    {
        id: 0,
        label: 'Xem & chỉnh sửa',
        icon: EditOutlined,
        style: {fontSize: '2rem'},
        onClick: (dispatch, closeMenu) => e => {
            closeMenu();
            dispatch(openAppointmentDetail(true));
        },
    },
    {
        id: 1,
        label: 'Khôi phục',
        icon: RestartAltOutlined,
        style: {fontSize: '2rem'},
    },
    {
        id: 2,
        label: 'Hủy',
        icon: DoDisturbAltOutlined,
        style: {
            color: 'error.main',
            fontSize: '2rem',
        },
    },
];
export default menu;
