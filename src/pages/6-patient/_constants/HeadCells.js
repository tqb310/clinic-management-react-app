import {ArrowDownward} from '@mui/icons-material';
export const headCells = [
    {
        id: 1,
        label: 'Mã',
        property: 'id',
        style: {textAlign: 'center', width: '60px'},
    },
    {
        id: 2,
        label: 'Tên bệnh nhân',
        property: 'first_name',
        icon: ArrowDownward,
        action: 'sort',
        style: {width: '250px'},
    },
    {
        id: 3,
        label: 'Ngày sinh',
        property: 'createAt',
        style: {width: '120px'},
    },
    {
        id: 4,
        label: 'Giới tính',
        property: 'type',
        style: {width: '110px'},
    },
    {
        id: 5,
        label: 'Địa chỉ',
        property: 'doctor',
        style: {width: 'auto'},
    },
    {
        id: 7,
        label: '',
        style: {width: '30px'},
    },
    {
        id: 8,
        label: '',
        style: {width: '30px'},
    },
];

export const tabNames = [
    {title: 'Tất cả', number: 50},
    {title: 'Đã thanh toán', number: 4},
    {title: 'Đang chờ', number: 2},
    {title: 'Qua lượt', number: 4},
];
