import {Payments, EditOutlined} from '@mui/icons-material';

const menuItems = [
    {
        id: 0,
        label: 'Thanh toán',
        icon: Payments,
        style: {fontSize: '2rem'},
    },
    {
        id: 1,
        label: 'Chỉnh sửa',
        icon: EditOutlined,
        divider: true,
        style: {fontSize: '2rem'},
    },
];
export default menuItems;
