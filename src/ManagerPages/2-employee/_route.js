import {lazy} from 'react';
import {AssignmentInd} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2,10),
    path: '/nhan-vien',
    name: 'Nhân viên',
    public: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: AssignmentInd
};

export default route;