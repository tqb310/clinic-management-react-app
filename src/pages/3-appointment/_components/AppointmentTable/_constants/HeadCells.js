import {ArrowDownward} from '@mui/icons-material';
export const headCells = [
    {
        id: 1,
        label: 'Bệnh nhân',
        property: 'patientName',
        icon: ArrowDownward,
        action: 'sort',
        style: {pl: '1rem'},
    },
    {
        id: 2,
        label: 'Giờ',
        property: 'time',
        style: {width: '50px'},
    },
    {
        id: 3,
        label: 'Bác sĩ',
        property: 'doctor',
        style: {width: '150px'},
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
