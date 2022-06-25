import {lazy} from 'react';
import {Group} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/nhan-vien',
    name: 'Nhân viên',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Group,
    roles: [1, 2, 3],
};

export default route;
