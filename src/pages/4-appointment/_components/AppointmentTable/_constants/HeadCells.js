import {ArrowDownward} from '@mui/icons-material';
export const headCells = [
    {
        id: 1,
        label: 'Mã',
        property: 'id',
        style: {width: '60px', textAlign: 'center'},
    },
    {
        id: 2,
        label: 'Bệnh nhân',
        property: 'first_name',
        icon: ArrowDownward,
        action: 'sort',
        style: {pl: '1rem'},
    },
    {
        id: 3,
        label: 'Loại',
        property: 'time',
        style: {width: '100px'},
    },
    {
        id: 5,
        label: 'Giờ',
        property: 'time',
        style: {width: '80px'},
    },
    {
        id: 4,
        label: 'Trạng thái',
        property: 'status',
        style: {width: '80px'},
    },
    // {
    //     id: 6,
    //     label: 'Trạng thái',
    //     property: 'status',
    //     style: {},
    // },
    {
        id: 5,
        label: '',
    },
];
