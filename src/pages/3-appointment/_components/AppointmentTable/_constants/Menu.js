import {
    RemoveRedEyeOutlined,
    EditOutlined,
    RestartAltOutlined,
    DoDisturbAltOutlined,
} from '@mui/icons-material';

export default [
    {
        id: 0,
        label: 'Xem chi tiết',
        icon: RemoveRedEyeOutlined,
    },
    {
        id: 1,
        label: 'Chỉnh sửa',
        icon: EditOutlined,
        divider: true,
    },
    {
        id: 2,
        label: 'Khôi phục',
        icon: RestartAltOutlined,
    },
    {
        id: 3,
        label: 'Hủy',
        icon: DoDisturbAltOutlined,
        style: {
            color: 'error.main',
        },
    },
];
