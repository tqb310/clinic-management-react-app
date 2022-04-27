import {lazy} from 'react';
import {Sick} from '@mui/icons-material';

const route = {
    id: Math.random().toString(32).substr(2, 10),
    path: '/benh-nhan',
    name: 'Bệnh nhân',
    isPublic: false,
    exact: true,
    component: lazy(() => import('./index')),
    icon: Sick,
    roles: [0, 1, 2],
};
export default route;
