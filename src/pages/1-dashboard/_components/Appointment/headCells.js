import {ArrowDownward} from '@mui/icons-material';
export const headCells = [
    {
        id: 1,
        label: '#',
        property: 'id',
        style: {width: '100px', textAlign: 'center'},
    },
    {
        id: 2,
        label: 'Bệnh nhân',
        property: 'first_name',
        icon: ArrowDownward,
        action: 'sort',
        style: {},
    },
    {
        id: 3,
        label: 'Loại',
        property: 'time',
        style: {width: '150px'},
    },
    {
        id: 5,
        label: 'Giờ',
        property: 'time',
        style: {width: '150px'},
    },
    {
        id: 4,
        label: 'Trạng thái',
        property: 'status',
        style: {width: '150px'},
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
        style: {width: '50px'},
    },
];
