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
        label: 'Xem chi tiết',
        icon: RemoveRedEyeOutlined,
        style: {fontSize: '2rem'},
        onClick: (dispatch, closeMenu) => e => {
            closeMenu();
            dispatch(openAppointmentDetail(true));
        },
    },
    {
        id: 1,
        label: 'Chỉnh sửa',
        icon: EditOutlined,
        divider: true,
        style: {fontSize: '2rem'},
    },
    {
        id: 2,
        label: 'Khôi phục',
        icon: RestartAltOutlined,
        style: {fontSize: '2rem'},
    },
    {
        id: 3,
        label: 'Hủy',
        icon: DoDisturbAltOutlined,
        style: {
            color: 'error.main',
            fontSize: '2rem',
        },
    },
];
export default menu;
