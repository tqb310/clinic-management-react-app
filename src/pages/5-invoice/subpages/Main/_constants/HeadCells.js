import {ArrowDownward} from '@mui/icons-material';

//For Invoice table
export const headCells = [
    {
        id: 1,
        label: 'Mã',
        property: 'id',
        style: {textAlign: 'center', width: '80px'},
    },
    {
        id: 2,
        label: 'Tên bệnh nhân',
        property: 'first_name',
        icon: ArrowDownward,
        action: 'sort',
        style: {width: 'auto'},
    },
    {
        id: 3,
        label: 'Ngày lập',
        property: 'createAt',
        style: {width: '150px'},
    },
    {
        id: 4,
        label: 'Loại phiếu',
        property: 'type',
        style: {width: '150px'},
    },
    {
        id: 5,
        label: 'Tổng Phí',
        property: 'expense',
        style: {width: '150px'},
    },
    {
        id: 6,
        label: '',
    },
];

//For service table in a invoice
export const serviceHeadCells = [
    {
        id: 1,
        label: 'Mục',
        style: {width: 'auto', textAlign: 'left'},
    },
    {
        id: 2,
        label: 'SL',
        style: {width: '40px', textAlign: 'left'},
    },
    {
        id: 3,
        label: 'Đơn giá',
        style: {width: '80px', textAlign: 'left'},
    },
    {
        id: 4,
        label: 'Thành tiền',
        style: {width: '80px', textAlign: 'left'},
    },
];
