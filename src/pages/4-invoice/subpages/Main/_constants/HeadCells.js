import {ArrowDownward} from '@mui/icons-material';
export const headCells = [
    {
        id: 1,
        label: 'Mã phiếu',
        property: 'id',
        style: {textAlign: 'center', width: '80px'},
    },
    {
        id: 2,
        label: 'Tên bệnh nhân',
        property: 'patientName',
        icon: ArrowDownward,
        action: 'sort',
        style: {width: 'auto'},
    },
    {
        id: 3,
        label: 'Ngày lập',
        property: 'createAt',
        style: {width: '120px'},
    },
    {
        id: 4,
        label: 'Loại phiếu',
        property: 'type',
        style: {width: '110px'},
    },
    {
        id: 5,
        label: 'Bác sĩ khám',
        property: 'doctor',
        style: {width: '180px'},
    },
    {
        id: 6,
        label: 'Tổng Phí',
        property: 'expense',
        style: {width: '140px'},
    },
    {
        id: 7,
        label: '',
    },
];
