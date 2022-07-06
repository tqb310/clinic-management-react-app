import {Payments, EditOutlined} from '@mui/icons-material';
import {switchDrawer} from '_redux/slice/invoiceSlice';

const menuItems = [
    {
        id: 0,
        label: 'Thanh toán',
        icon: Payments,
        style: {fontSize: '2rem'},
        onClick: (dispatch, setAnchor) => _ => {
            dispatch(switchDrawer(true));
            setAnchor(null);
        },
    },
    {
        id: 1,
        label: 'Xem & Chỉnh sửa',
        icon: EditOutlined,
        divider: true,
        style: {fontSize: '2rem'},
        onClick:
            (dispatch, setAnchor, history, {id}) =>
            _ => {
                history.push(
                    `${history.location.pathname}/${id}`,
                );
            },
    },
];
export default menuItems;
